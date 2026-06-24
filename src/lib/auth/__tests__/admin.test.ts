import { vi } from "vitest";

class RedirectError extends Error {
  url: string;
  constructor(url: string) {
    super(`NEXT_REDIRECT: ${url}`);
    this.url = url;
  }
}

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new RedirectError(url);
  }),
}));

vi.mock("next/headers", () => ({
  cookies: vi.fn(() =>
    Promise.resolve({
      getAll: () => [],
      set: () => undefined,
    })
  ),
}));

import { requireAdmin } from "../admin";
import { createClient } from "@/lib/supabase/server";

function mockSupabase(user: unknown, profileRole?: string) {
  const selectMock = {
    eq: vi.fn().mockReturnValue({
      single: vi.fn().mockResolvedValue({
        data: profileRole ? { role: profileRole } : null,
      }),
    }),
  };

  vi.mocked(createClient).mockResolvedValue({
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user },
        error: null,
      }),
    },
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue(selectMock),
    }),
  } as unknown as Awaited<ReturnType<typeof createClient>>);
}

describe("requireAdmin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects to admin login when no session exists", async () => {
    mockSupabase(null);
    await expect(requireAdmin("en")).rejects.toThrow("/en/admin/login");
  });

  it("redirects to home when role is not admin (from app_metadata)", async () => {
    mockSupabase({ id: "123", app_metadata: { user_role: "student" } });
    await expect(requireAdmin("en")).rejects.toThrow("/en");
  });

  it("falls back to profiles table when app_metadata has no role", async () => {
    mockSupabase({ id: "123", app_metadata: {} }, "admin");
    const result = await requireAdmin("en");
    expect(result).toEqual({ id: "123", app_metadata: {} });
  });

  it("redirects when profiles table also has no admin role", async () => {
    mockSupabase({ id: "123", app_metadata: {} }, "student");
    await expect(requireAdmin("en")).rejects.toThrow("/en");
  });

  it("returns user when role is admin in app_metadata", async () => {
    const adminUser = {
      id: "admin-123",
      email: "admin@ilm.com",
      app_metadata: { user_role: "admin" },
    };
    mockSupabase(adminUser);
    const result = await requireAdmin("en");
    expect(result).toEqual(adminUser);
  });

  it("uses correct locale in redirect paths", async () => {
    mockSupabase(null);
    await expect(requireAdmin("ar")).rejects.toThrow("/ar/admin/login");
  });
});
