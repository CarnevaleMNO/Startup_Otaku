import { Outlet, Link, useLoaderData, redirect, json } from "remix";
import { getPosts } from "~/post";
import { getSession } from "~/sessions.server";
import { commitSession } from "~/sessions.server";
import { auth } from "~/utils/firebase";
import { getAuth } from "firebase/auth";

export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("access_token")) {
    return redirect("/auth/login");
  }
  const auth = getAuth();

  const data = { user: auth.currentUser, error: session.get("error") };

  const user = auth.currentUser;
  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    
  }
  const userInfo = { displayName: user.displayName, email: user.email};
  if (userInfo.email !== "carnevalema89@gmail.com") {
    return redirect("/posts");
  }
  return (
    json(data, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }),
    getPosts()
  );
}

export default function Admin() {
  let data = useLoaderData();
  console.log(data);
  return (
    <div className="admin-page">
      <div className="admin-list">
        <h1>Admin Page</h1>
        <div className="admin-post-list">
          <p>Click on a post to edit the blog post</p>
          <ul>
            {data.postListItems.map((post) => (
              <li key={post.slug}>
                <Link to={post.slug}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
