import { describe, it, expect } from "vitest";
import { contactSchema, contactSubjects, type ContactInput } from "../schemas";

describe("contactSchema", () => {
  it("accepts valid input", () => {
    const result = contactSchema.safeParse({
      name: "Fatima Ahmad",
      email: "fatima@example.com",
      subject: "gcse",
      message: "I would like to inquire about GCSE tutoring sessions for my daughter.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty name", () => {
    const result = contactSchema.safeParse({
      name: "",
      email: "test@example.com",
      subject: "gcse",
      message: "This is a valid message that is long enough.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = contactSchema.safeParse({
      name: "Test User",
      email: "not-an-email",
      subject: "alevel",
      message: "This is a valid message that is long enough.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects message under 20 characters", () => {
    const result = contactSchema.safeParse({
      name: "Test User",
      email: "test@example.com",
      subject: "ib",
      message: "Too short",
    });
    expect(result.success).toBe(false);
  });

  it("exports contactSubjects array and ContactInput type", () => {
    expect(contactSubjects).toEqual(["gcse", "alevel", "ib", "tawjihi", "general"]);
    const valid: ContactInput = {
      name: "Test",
      email: "t@t.com",
      subject: "gcse",
      message: "A message that is definitely long enough for validation.",
    };
    expect(contactSchema.parse(valid)).toEqual(valid);
  });

  it("rejects invalid subject enum", () => {
    const result = contactSchema.safeParse({
      name: "Test User",
      email: "test@example.com",
      subject: "invalid_subject",
      message: "This is a valid message that is long enough.",
    });
    expect(result.success).toBe(false);
  });
});
