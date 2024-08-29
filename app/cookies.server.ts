import { createCookie } from "@remix-run/node";

export const randomCookie = createCookie("random", {
  maxAge: 604_800, // one week
});
