import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

export function renderWithRouter(ui: ReactElement, { route = "/" } = {}) {
  window.history.pushState({}, "Test page", route);
  return render(ui, { wrapper: BrowserRouter });
}
