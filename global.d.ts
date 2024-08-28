import { ReactNode } from "react";

declare global {
  interface WindowEventMap {
    "show-overlay": CustomEvent<{ type: "contact"; render: ReactNode }>;
  }
}
