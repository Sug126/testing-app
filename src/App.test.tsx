import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";

import App from "./App";

describe("App component", () => {
  // declare which API requests to mock
  const server = setupServer(
    rest.get(`https://swapi.dev/api/people/1`, (req, res, ctx) => {
     
      return res(ctx.json({ name: "Luke Skywalker" }));
    })
  );

  beforeAll(() => {
    server.listen();
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("renders header", () => {
    render(<App />);
    const header = screen.getByText(/SWAPI - The Star Wars API/i);
    expect(header).toBeInTheDocument();
  });

  it("loads and renders First person", async () => {
    render(<App />);
    await screen.findByText(/First Person from the Star War People/i);
    const text = screen.getByText(/Luke Skywalker/i);
    expect(text).toBeInTheDocument();
  });


  it("handles server error 418", async () => {
    server.use(
      rest.get("https://swapi.dev/api/people/1", (req, res, ctx) => {
        return res(ctx.status(418));
      })
    );
    render(<App />);
    await screen.findByText(/418 I'm a tea pot 🫖/i);
    expect(
      screen.getByText(/418 I'm a tea pot 🫖/i)
    ).toBeInTheDocument();
  });
});