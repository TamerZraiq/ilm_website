import { vi, type Mock } from "vitest";

const { mockLimit, mockSend } = vi.hoisted(() => ({
  mockLimit: vi.fn(),
  mockSend: vi.fn(),
}));

vi.mock("@upstash/ratelimit", () => {
  class Ratelimit {
    limit = mockLimit;
    static slidingWindow = vi.fn();
  }
  return { Ratelimit };
});

vi.mock("@upstash/redis", () => ({
  Redis: { fromEnv: vi.fn() },
}));

vi.mock("resend", () => {
  class Resend {
    emails = { send: mockSend };
  }
  return { Resend };
});

import { POST } from "../route";

function makeRequest(body: unknown, ip?: string) {
  const headers = new Headers({ "Content-Type": "application/json" });
  if (ip) headers.set("x-forwarded-for", ip);

  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
}

const validBody = {
  name: "Fatima Ahmad",
  email: "fatima@example.com",
  subject: "gcse",
  message: "I would like to learn more about GCSE tutoring options available.",
};

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLimit.mockResolvedValue({ success: true });
    mockSend.mockResolvedValue({ id: "test-id" });
    process.env.CONTACT_EMAIL = "test@ilm.com";
  });

  it("returns 200 on valid input", async () => {
    const res = await POST(makeRequest(validBody, "1.2.3.4"));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true });
    expect(mockSend).toHaveBeenCalledOnce();
  });

  it("returns 429 when rate limited", async () => {
    mockLimit.mockResolvedValue({ success: false });

    const res = await POST(makeRequest(validBody, "1.2.3.4"));

    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBe("3600");
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("returns 400 on missing field", async () => {
    const res = await POST(
      makeRequest({ name: "Test", email: "a@b.com", subject: "gcse" })
    );

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Invalid input" });
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("returns 500 when Resend throws", async () => {
    mockSend.mockRejectedValue(new Error("Resend API down"));

    const res = await POST(makeRequest(validBody));

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: "Failed to send message" });
  });

  it("strips HTML from name and message before sending", async () => {
    const body = {
      ...validBody,
      name: '<script>alert("xss")</script>Fatima',
      message:
        'Hello <b>bold</b> world, I need tutoring for my child please help.',
    };

    await POST(makeRequest(body));

    const call = (mockSend as Mock).mock.calls[0]?.[0];
    expect(call.subject).toBe('New inquiry [gcse] from alert("xss")Fatima');
    expect(call.text).toContain('alert("xss")Fatima');
    expect(call.text).toContain("Hello bold world");
    expect(call.text).not.toContain("<script>");
    expect(call.text).not.toContain("<b>");
  });
});
