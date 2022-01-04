// app/sessions.js
import { createCookieSessionStorage } from "remix";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
        //firebase token
      name: "fb:startupToken",

      // all of these are optional
      expires: new Date(Date.now() + 600),
      httpOnly: true,
      maxAge: 600,
      path: "/",
      sameSite: "lax",
      secrets: ["emachanchanemachanchanchan"],
      secure: true
    }
  });

export { getSession, commitSession, destroySession };