import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "../app/components/contact-form";
import { openMailClient } from "../app/lib/mailto";
import { contact } from "../app/lib/site";

vi.mock("../app/lib/mailto", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../app/lib/mailto")>()),
  openMailClient: vi.fn(),
}));

const sent = vi.mocked(openMailClient);

beforeEach(() => {
  sent.mockClear();
});

async function fillEnquiry(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/your name/i), "Ada Obi");
  await user.type(screen.getByLabelText(/email address/i), "ada@example.com");
  await user.type(
    screen.getByLabelText(/message/i),
    "We need airport protocol support.",
  );
}

describe("contact form", () => {
  it("emails the enquiry to the company address", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillEnquiry(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    const href = decodeURIComponent(sent.mock.calls.at(-1)?.[0] as string);
    expect(href.startsWith(`mailto:${contact.email}`)).toBe(true);
    expect(href).toContain("Ada Obi");
    expect(href).toContain("We need airport protocol support.");
  });

  it("confirms to the visitor after sending", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillEnquiry(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(screen.getByRole("status")).toHaveTextContent(
      /email client is opening/i,
    );
  });

  it("requires the visitor to identify themselves", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/your name/i)).toBeRequired();
    expect(screen.getByLabelText(/email address/i)).toBeRequired();
    expect(screen.getByLabelText(/message/i)).toBeRequired();
  });
});
