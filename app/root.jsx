import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import globalStylesUrl from "~/styles/global.css";

export function meta() {
  const title = "Startup Otaku";
  const description = "A blog about startup companies in Tokyo, Japan.";
  const keywords =
    "Remix, React, Javascript, Japan, Tokyo, Startups, Startup Otaku, Blog";

  return { title, description, keywords };
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export const links = () => [
  { rel: "stylesheet", href: globalStylesUrl },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com" },
  {
    href: "https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;400;500;600;700;800&display=swap",
    rel: "stylesheet",
  },
];

// export function ErrorBoundary({ error }) {
//   console.error(error);
//   return (
//     <div className="error">
//       <h1>Error</h1>
//       <p>{error.message}</p>
//     </div>
//   );
// }

export const Header = () => {
  return (
    <header>
      <div className="title">
        <h1>
          <Link to="/">
            <span>Startup</span>Otaku
          </Link>
        </h1>
      </div>
      <nav>
        <ul>
          <li key="startups">
            <Link to="/posts">Blog</Link>
          </li>
          <li key="contact">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
