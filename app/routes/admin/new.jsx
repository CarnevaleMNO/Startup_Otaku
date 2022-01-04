import { redirect, Form, useActionData, useTransition } from "remix";
import { createPost } from "~/post";

export let action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");
  let slug = formData.get("slug");
  let markdown = formData.get("markdown");
  let photo = formData.get("photo");
  let description = formData.get("description");

  let errors = {};
  if (!title) errors.title = true;
  if (!slug) errors.slug = true;
  if (!markdown) errors.markdown = true;
  if (!photo) errors.photo = true;
  if (!description) errors.description = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  await createPost({ title, slug, markdown, photo, description });

  return redirect("/admin");
};

export default function NewPost() {

  let errors = useActionData();
  let transition = useTransition();
  
  let slug = "";
  const handleChange = (e) => {
    let text = e.target.value;
    slug = text.replace(/\s/g, "-");
    document.getElementById("slugInput").value = slug.toLowerCase();
  };
  return (
    <Form method="post">
      <p>
        <label htmlFor="">
          Post Title: {errors?.title && <em>Title is required</em>}{" "}
          <input onChange={handleChange} type="text" name="title" />
        </label>
      </p>
      <p>
        <label htmlFor="">
          {" "}
          Post Slug: {errors?.slug && <em>Slug is required</em>}
          <input placeholder={slug} id="slugInput" type="text" name="slug" />
        </label>
      </p>
      <p>
        <label htmlFor="">
          Post Description: {errors?.description && <em>Description is required</em>}{" "}
          <input type="text" name="description" />
        </label>
      </p>
      <p>
        <label htmlFor="">
          Post Photo: {errors?.photo && <em>Photo is required</em>}{" "}
          <input type="text" name="photo" />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown:</label>{" "}
        {errors?.markdown && <em>Markdown is required</em>}
        <br />
        <textarea name="markdown" id="" rows={20} cols={30} />
      </p>
      <p>
        <button type="submit" className="btn">
          {transition.submission ? "Creating..." : "Create Post"}
        </button>
      </p>
    </Form>
  );
}
