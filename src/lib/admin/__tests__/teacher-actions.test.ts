import { vi } from "vitest";

const { mockInsert, mockDelete, mockFrom } = vi.hoisted(() => {
  const mockInsert = vi.fn().mockResolvedValue({ error: null });
  const mockDelete = vi.fn().mockReturnValue({
    eq: vi.fn().mockResolvedValue({ error: null }),
  });
  const mockFrom = vi.fn().mockImplementation(() => ({
    insert: mockInsert,
    delete: () => mockDelete(),
  }));
  return { mockInsert, mockDelete, mockFrom };
});

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    from: mockFrom,
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: {
          user: { id: "admin-1", app_metadata: { user_role: "admin" } },
        },
      }),
    },
  }),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`REDIRECT:${url}`);
  }),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("next/headers", () => ({
  cookies: vi.fn(() =>
    Promise.resolve({ getAll: () => [], set: () => undefined })
  ),
}));

import { createTeacher, deleteTeacher } from "../teacher-actions";
import { createClient } from "@/lib/supabase/server";

describe("teacher-actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createTeacher", () => {
    it("redirects if user is not admin", async () => {
      vi.mocked(createClient).mockResolvedValueOnce({
        auth: {
          getUser: vi.fn().mockResolvedValue({
            data: { user: { id: "u1", app_metadata: { user_role: "student" } } },
          }),
        },
        from: mockFrom,
      } as unknown as Awaited<ReturnType<typeof createClient>>);

      await expect(createTeacher(new FormData())).rejects.toThrow("REDIRECT");
    });

    it("calls supabase insert with correct data", async () => {
      const formData = new FormData();
      formData.set("full_name", "Dr. Ahmad");
      formData.set("full_name_ar", "د. أحمد");
      formData.set("bio", "Maths expert");
      formData.set("bio_ar", "");
      formData.set("subjects", '["Maths","Physics"]');
      formData.set("avatar_url", "");
      formData.set("display_order", "1");
      formData.set("is_visible", "true");

      await createTeacher(formData);

      expect(mockFrom).toHaveBeenCalledWith("teachers");
      expect(mockInsert).toHaveBeenCalledWith({
        full_name: "Dr. Ahmad",
        full_name_ar: "د. أحمد",
        bio: "Maths expert",
        bio_ar: null,
        subjects: ["Maths", "Physics"],
        avatar_url: null,
        display_order: 1,
        is_visible: true,
      });
    });
  });

  describe("deleteTeacher", () => {
    it("calls supabase delete with correct id", async () => {
      const eqMock = vi.fn().mockResolvedValue({ error: null });
      mockDelete.mockReturnValue({ eq: eqMock });

      await deleteTeacher("teacher-123");

      expect(mockFrom).toHaveBeenCalledWith("teachers");
      expect(eqMock).toHaveBeenCalledWith("id", "teacher-123");
    });
  });
});
