import invariant from "tiny-invariant";
import { getPostEdit, updatePost, deletePost } from "~/post";
import {
  redirect,
  Form,
  useActionData,
  useTransition,
  useLoaderData,
} from "remix";

import { db } from "~/utils/db.server";
import { getSession } from "~/sessions.server";
import { commitSession } from "~/sessions.server";
import { auth } from "~/utils/firebase";
import { getAuth } from "firebase/auth";

export let loader = async ({ params }) => {
  invariant(params.edit, "expected params.edit");

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
  const userInfo = { displayName: user.displayName, email: user.email };
  if (userInfo.email !== "carnevalema89@gmail.com") {
    return redirect("/posts");
  }

  return getPostEdit(params.edit);
};

export let action = async ({ request }) => {
  let formData = await request.formData();

  let title = formData.get("title");
  let slug = formData.get("slug");
  let markdown = formData.get("markdown");
  let id = formData.get("id");
  if (request.method == "DELETE") {
    await deletePost(id);
    return redirect("/admin");
  }

  let errors = {};
  if (!title) errors.title = true;
  if (!slug) errors.slug = true;
  if (!markdown) errors.markdown = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  console.log(
    "calling updatePost with id, title, slug, markdown: ",
    id,
    title,
    slug,
    markdown
  );
  await updatePost({ id, title, slug, markdown });

  return redirect("/admin");
};

export default function PostSlug() {
  let errors = useActionData();
  let transition = useTransition();
  let post = useLoaderData();
  return (
    <>
      <Form method="post">
        <p>
          <input className="hiddenBlogID" name="id" value={post.id}></input>
        </p>
        <p>
          <label htmlFor="">
            Post Title: {errors?.title && <em>Title is required</em>}{" "}
            <input type="text" name="title" defaultValue={post.title} />
          </label>
        </p>
        <p>
          <label htmlFor="">
            {" "}
            Post Slug: {errors?.slug && <em>Slug is required</em>}
            <input
              defaultValue={post.slug}
              id="slugInput"
              type="text"
              name="slug"
            />
          </label>
        </p>
        <p>
          <label htmlFor="markdown">Markdown:</label>{" "}
          {errors?.markdown && <em>Markdown is required</em>}
          <br />
          <textarea
            defaultValue={post.markdown}
            name="markdown"
            id=""
            rows={20}
            cols={30}
          />
        </p>
        <p>
          <button type="submit" className="btn">
            {transition.submission ? "Updating..." : "Update Post"}
          </button>
        </p>
      </Form>
      <Form method="DELETE">
        <input type="hidden" name="id" defaultValue={post.id} />

        <button className="btn" type="submit">
          Delete
        </button>
      </Form>
    </>
  );
}
