import { cn } from "../utils";

describe("cn", () => {
  it("merges conditional class names", () => {
    expect(cn("base", false && "hidden", "extra")).toBe("base extra");
  });

  it("resolves conflicting tailwind classes to the last one", () => {
    expect(cn("px-2 text-navy", "px-4")).toBe("text-navy px-4");
  });
});
