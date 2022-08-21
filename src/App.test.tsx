import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("App test component", () => {
  it("renders App component", () => {
    render(<App />);
    const textElement = screen.getByText(/Search:/i);
    expect(textElement).toBeInTheDocument();
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });
  it("async App component", async () => {
    render(<App />);
    expect(screen.queryByText(/Loaded in as/i)).toBeNull();
    expect(await screen.findByText(/Loaded in as/i)).toBeInTheDocument();
  });
  it("event App ", async () => {
    render(<App />);
    const inputElement = screen.getByRole("textbox");
    userEvent.type(inputElement, "Alexander Pohozhalov");
    expect(screen.getByRole("textbox")).toHaveValue("Alexander Pohozhalov");
  });
});
