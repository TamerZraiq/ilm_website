import { z } from "zod";

export const contactSubjects = [
  "gcse",
  "alevel",
  "ib",
  "tawjihi",
  "general",
] as const;

export type ContactSubject = (typeof contactSubjects)[number];

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.email("Please enter a valid email address"),
  subject: z.enum(contactSubjects, {
    error: "Please select a subject",
  }),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(2000, "Message is too long"),
});

export type ContactInput = z.infer<typeof contactSchema>;
