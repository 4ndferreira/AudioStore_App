import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Banner from "./Banner";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

const fakeImageUrl = "/img/fake-url.com/image.jpg";
vi.mock("../getImage/GetImage", () => ({
  default: vi.fn(() => fakeImageUrl),
}));

describe("Banner", () => {
  const mockProps = {
    id: 42,
    title: "Banner works!",
    category: "Category mock",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should renders", () => {
    render(
      <MemoryRouter>
        <Banner {...mockProps} />
      </MemoryRouter>
    );

    expect(screen.getByText("Banner works!")).toBeInTheDocument();
  });

  it("display the title passed via props", () => {
    render(
      <MemoryRouter>
        <Banner {...mockProps} />
      </MemoryRouter>
    );
    const heading = screen.getByRole("heading", { name: "Banner works!" });
    expect(heading).toBeInTheDocument();
  });

  it("renders the correct link to the product", () => {
    render(
      <MemoryRouter>
        <Banner {...mockProps} />
      </MemoryRouter>
    );
    const link = screen.getByRole("link", { name: /shop now/i });
    expect(link).toHaveAttribute("href", "/products/42");
  });

  it("uses the category image correctly", () => {
    render(
      <MemoryRouter>
        <Banner {...mockProps} />
      </MemoryRouter>
    );
    const img = screen.getByAltText(mockProps.category);
    expect(img).toHaveAttribute("src", fakeImageUrl);
  });
});
