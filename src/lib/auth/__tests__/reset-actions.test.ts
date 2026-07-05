import { vi } from "vitest";

class RedirectError extends Error {
  url: string;
  constructor(url: string) {
    super(`NEXT_REDIRECT: ${url}`);
    this.url = url;
  }
}

const { mockResetPasswordForEmail, mockUpdateUser, mockSignOut, mockCheckRateLimit } =
  vi.hoisted(() => ({
    mockResetPasswordForEmail: vi.fn().mockResolvedValue({ error: null }),
    mockUpdateUser: vi.fn().mockResolvedValue({ error: null }),
    mockSignOut: vi.fn().mockResolvedValue({ error: null }),
    mockCheckRateLimit: vi.fn().mockResolvedValue(true),
  }));

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      resetPasswordForEmail: mockResetPasswordForEmail,
      updateUser: mockUpdateUser,
      signOut: mockSignOut,
    },
  }),
}));

vi.mock("@/lib/auth/admin", () => ({
  requireAdmin: vi.fn().mockResolvedValue({ id: "admin-1" }),
}));

vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: mockCheckRateLimit,
}));

vi.mock("next/headers", () => ({
  headers: vi.fn(() => Promise.resolve(new Headers({ "x-forwarded-for": "1.2.3.4" }))),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new RedirectError(url);
  }),
}));

import { requestPasswordReset, updatePasswordAction } from "../reset-actions";

function formData(entries: Record<string, string>) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(entries)) fd.set(k, v);
  return fd;
}

describe("requestPasswordReset", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCheckRateLimit.mockResolvedValue(true);
    mockResetPasswordForEmail.mockResolvedValue({ error: null });
  });

  it("rejects an invalid email without calling Supabase", async () => {
    const result = await requestPasswordReset("en", {}, formData({ email: "not-an-email" }));
    expect(result).toEqual({ error: "invalid_input" });
    expect(mockResetPasswordForEmail).not.toHaveBeenCalled();
  });

  it("returns rate_limited when too many requests come from one IP", async () => {
    mockCheckRateLimit.mockResolvedValue(false);
    const result = await requestPasswordReset("en", {}, formData({ email: "admin@ilm.com" }));
    expect(result).toEqual({ error: "rate_limited" });
    expect(mockResetPasswordForEmail).not.toHaveBeenCalled();
  });

  it("sends a locale-aware reset email and reports generic success", async () => {
    const result = await requestPasswordReset("ar", {}, formData({ email: "admin@ilm.com" }));
    expect(result).toEqual({ success: true });
    expect(mockResetPasswordForEmail).toHaveBeenCalledWith(
      "admin@ilm.com",
      expect.objectContaining({
        redirectTo: expect.stringContaining("/ar/admin/reset-password/confirm"),
      })
    );
  });

  it("still reports success even if the account doesn't exist", async () => {
    // Supabase itself doesn't leak existence; the action must not add a branch that does.
    const result = await requestPasswordReset("en", {}, formData({ email: "nobody@ilm.com" }));
    expect(result).toEqual({ success: true });
  });
});

describe("updatePasswordAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUpdateUser.mockResolvedValue({ error: null });
  });

  it("rejects a password shorter than 12 characters", async () => {
    const result = await updatePasswordAction(
      "en",
      {},
      formData({ password: "short1234", confirmPassword: "short1234" })
    );
    expect(result).toEqual({ error: "password_too_short" });
    expect(mockUpdateUser).not.toHaveBeenCalled();
  });

  it("rejects mismatched passwords", async () => {
    const result = await updatePasswordAction(
      "en",
      {},
      formData({ password: "correcthorsebattery", confirmPassword: "different-one" })
    );
    expect(result).toEqual({ error: "passwords_mismatch" });
    expect(mockUpdateUser).not.toHaveBeenCalled();
  });

  it("updates the password, signs out, and redirects to login on success", async () => {
    await expect(
      updatePasswordAction(
        "en",
        {},
        formData({ password: "correcthorsebattery", confirmPassword: "correcthorsebattery" })
      )
    ).rejects.toThrow("/en/admin/login?reset=success");

    expect(mockUpdateUser).toHaveBeenCalledWith({ password: "correcthorsebattery" });
    expect(mockSignOut).toHaveBeenCalled();
  });

  it("reports update_failed when Supabase rejects the new password", async () => {
    mockUpdateUser.mockResolvedValue({ error: { message: "same as old" } });
    const result = await updatePasswordAction(
      "en",
      {},
      formData({ password: "correcthorsebattery", confirmPassword: "correcthorsebattery" })
    );
    expect(result).toEqual({ error: "update_failed" });
    expect(mockSignOut).not.toHaveBeenCalled();
  });
});
