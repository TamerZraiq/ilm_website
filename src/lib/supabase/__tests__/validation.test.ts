import { loginSchema, signupSchema } from "@/lib/auth/schemas";

describe("loginSchema", () => {
  it("passes with valid input", () => {
    const result = loginSchema.safeParse({
      email: "test@example.com",
      password: "password123",
    });
    expect(result.success).toBe(true);
  });

  it("fails with invalid email", () => {
    const result = loginSchema.safeParse({
      email: "not-an-email",
      password: "password123",
    });
    expect(result.success).toBe(false);
  });

  it("fails with password under 8 chars", () => {
    const result = loginSchema.safeParse({
      email: "test@example.com",
      password: "short",
    });
    expect(result.success).toBe(false);
  });
});

describe("signupSchema", () => {
  it("passes with valid input", () => {
    const result = signupSchema.safeParse({
      fullName: "Test User",
      email: "test@example.com",
      password: "password123",
      confirmPassword: "password123",
    });
    expect(result.success).toBe(true);
  });

  it("fails when passwords do not match", () => {
    const result = signupSchema.safeParse({
      fullName: "Test User",
      email: "test@example.com",
      password: "password123",
      confirmPassword: "different456",
    });
    expect(result.success).toBe(false);
  });

  it("fails with missing full name", () => {
    const result = signupSchema.safeParse({
      fullName: "",
      email: "test@example.com",
      password: "password123",
      confirmPassword: "password123",
    });
    expect(result.success).toBe(false);
  });
});
