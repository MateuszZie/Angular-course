import { ReversePipe } from "./reverse.pipe";

describe("Pipe", () => {
  it("pipe reverse", () => {
    const reversePipe = new ReversePipe();
    expect(reversePipe.transform("hello")).toBe("olleh");
  });
});
