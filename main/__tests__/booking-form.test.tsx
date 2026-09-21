import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BookingForm } from "../app/components/booking-form";
import { openMailClient } from "../app/lib/mailto";
import { contact } from "../app/lib/site";

// The hand-off to the mail client is the one side effect worth observing; the
// link itself is still built by the real `buildMailto`.
vi.mock("../app/lib/mailto", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../app/lib/mailto")>()),
  openMailClient: vi.fn(),
}));

const sent = vi.mocked(openMailClient);

beforeEach(() => {
  sent.mockClear();
});

/** The href the form handed to the mail client, decoded for easy assertions. */
function sentHref(): string {
  const href = sent.mock.calls.at(-1)?.[0];
  expect(href, "the form never opened the mail client").toBeTypeOf("string");
  return decodeURIComponent(href as string);
}

async function fillContactDetails(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/full name/i), "Ada Obi");
  await user.type(screen.getByLabelText(/email address/i), "ada@example.com");
  await user.type(screen.getByLabelText(/phone number/i), "+2348000000000");
}

describe("booking form", () => {
  it("reveals a picker only for the services that are ticked", async () => {
    const user = userEvent.setup();
    render(<BookingForm />);

    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();

    await user.click(screen.getByRole("checkbox", { name: "Armed escort" }));

    expect(
      screen.getByRole("combobox", { name: /armed escort option/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("combobox", { name: /event security option/i }),
    ).not.toBeInTheDocument();
  });

  it("hides the picker again when a service is unticked", async () => {
    const user = userEvent.setup();
    render(<BookingForm />);

    const escort = screen.getByRole("checkbox", { name: "Armed escort" });
    await user.click(escort);
    await user.click(escort);

    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  });

  it("emails a request containing the chosen vehicle", async () => {
    const user = userEvent.setup();
    render(<BookingForm />);

    await fillContactDetails(user);
    await user.click(
      screen.getByRole("checkbox", { name: "Executive car rental" }),
    );
    await user.selectOptions(
      screen.getByRole("combobox", { name: /executive car rental option/i }),
      "Toyota Prado",
    );
    await user.click(
      screen.getByRole("button", { name: /submit booking request/i }),
    );

    const href = sentHref();
    expect(href.startsWith(`mailto:${contact.email}`)).toBe(true);
    expect(href).toContain("Ada Obi");
    expect(href).toContain("ada@example.com");
    expect(href).toContain("rental: Toyota Prado");
  });

  it("notes a ticked service that has no option chosen", async () => {
    const user = userEvent.setup();
    render(<BookingForm />);

    await fillContactDetails(user);
    await user.click(screen.getByRole("checkbox", { name: "Event security" }));
    await user.click(
      screen.getByRole("button", { name: /submit booking request/i }),
    );

    expect(sentHref()).toContain("security: Not specified");
  });

  it("tells the visitor what is happening after submitting", async () => {
    const user = userEvent.setup();
    render(<BookingForm />);

    await fillContactDetails(user);
    await user.click(
      screen.getByRole("button", { name: /submit booking request/i }),
    );

    expect(screen.getByRole("status")).toHaveTextContent(
      /email client is opening/i,
    );
  });
});
