import { vi } from "vitest";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

vi.mock("next/headers", () => ({
  cookies: vi.fn(() =>
    Promise.resolve({
      getAll: () => [],
      set: () => undefined,
    })
  ),
}));

import { getUserRole } from "../roles";
import { createClient } from "@/lib/supabase/server";

describe("getUserRole", () => {
  it("returns null when no session exists", async () => {
    vi.mocked(createClient).mockResolvedValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: null },
          error: null,
        }),
      },
    } as unknown as Awaited<ReturnType<typeof createClient>>);

    const role = await getUserRole();
    expect(role).toBeNull();
  });

  it("returns the role from app_metadata", async () => {
    vi.mocked(createClient).mockResolvedValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: {
            user: {
              id: "123",
              app_metadata: { user_role: "teacher" },
            },
          },
          error: null,
        }),
      },
    } as unknown as Awaited<ReturnType<typeof createClient>>);

    const role = await getUserRole();
    expect(role).toBe("teacher");
  });
});
