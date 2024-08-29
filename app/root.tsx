import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Sidebar from "./components/Sidebar";

import css from "./tailwind.css?url";
import { ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import { OverlayProvider } from "./components/Overlay";
import { randomCookie } from "./cookies.server";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: css }];

export const action = async ({ request }: ActionFunctionArgs) => {
  const cookieHeaders = request.headers.get("Cookie");
  const cookie = (await randomCookie.parse(cookieHeaders)) || {};

  cookie.toto = "tata";

  const response = new Response(JSON.stringify({ success: true }), {
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": await randomCookie.serialize(cookie),
    },
  });

  return response;
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <OverlayProvider>
      <main className="flex flex-col h-screen bg-gray-100">
        <Sidebar />
        <section className="flex-1 p-10">
          <Outlet />
        </section>
      </main>
    </OverlayProvider>
  );
}
