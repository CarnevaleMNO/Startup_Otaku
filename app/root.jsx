import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  redirect,
  useLoaderData,
  json,
  Form,
} from "remix";

import { getSession } from "~/sessions.server";
import { destroySession, commitSession } from "~/sessions.server";
import { auth } from "~/utils/firebase";
import { getAuth } from "firebase/auth";

import globalStylesUrl from "~/styles/global.css";

export function meta() {
  const title = "Startup Otaku";
  const description = "A blog about startup companies in Tokyo, Japan.";
  const keywords =
    "Remix, React, Javascript, Japan, Tokyo, Startups, Startup Otaku, Blog";

  return { title, description, keywords };
}

export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("access_token")) {
    const auth = getAuth();
    const data = { user: auth.currentUser, error: session.get("error") };

    return json(data, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } else {
    return null;
  }
}

export let action = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("access_token")) {
    return redirect("/", {
      headers: { "Set-Cookie": await destroySession(session) },
    });
  }
  auth.signOut();
  return redirect("/");
};

export const Header = () => {
  const data = useLoaderData();
  let loggedIn = data?.user;
  return (
    <header className="gradient__bg">
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
          {data?.user.email === "startupotaku@gmail.com" ? (
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          ) : null}
          {!loggedIn ? (
            <li>
              <Link to="/auth/login">Login</Link>
            </li>
          ) : (
            <li>
              <Form method="post">
                <button type="submit" className="navLogoutButton">
                  Logout
                </button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default function App() {
  const data = useLoaderData();

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
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css",
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
