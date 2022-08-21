import React from "react";
import axios from "axios";
import App from "../App";
import { findByText, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const hits = [
  {
    objectID: "1",
    title: "Angular",
  },
  {
    objectID: "2",
    title: "React",
  },
];

describe("Api testing component", () => {
  // Положительный тест
  it("fetches news from an API", async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { hits } })
    );
    const { getByRole, findAllByRole } = render(<App />);
    userEvent.click(getByRole("button"));
    const items = await findAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://hn.algolia.com/api/v1/search?query=React"
    );
  });
  // Негативный тест
  it("fetches news from an API and reject ", async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.reject(new Error()));
    const { getByRole, findByText } = render(<App />);
    userEvent.click(getByRole("button"));
    const message = await findByText(/Something went wrong/);
    expect(message).toBeInTheDocument();
  });
});
