import React from "react";
import { render } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button component", () => {
  it("renders correctly (snapshot)", () => {
    const { container } = render(<Button>Click me</Button>);
    expect(container).toMatchSnapshot();
  });

  it("renders with variant and size", () => {
    const { container } = render(
      <Button variant="destructive" size="lg">
        Delete
      </Button>
    );
    expect(container).toMatchSnapshot();
  });
});
