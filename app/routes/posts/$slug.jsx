import { useLoaderData, Meta } from "remix";
import invariant from "tiny-invariant";
import { getPost } from "~/post";

export let loader = async ({ params }) => {
  invariant(params.slug, "expected params.slug");
  return getPost(params.slug);
};

export default function PostSlug() {
  let post = useLoaderData();
  return (
    <>
      <div className="slug">
        <div
          className="postDisplay"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <img className="postDisplayPhoto" src={post.photo} alt="" />
      </div>
    </>
  );
}

//Seo
export function meta({data}) {
  const title = `${data.title}`;
  const description = "A blog about startup companies in Tokyo, Japan.";
  const keywords =
    "Remix, React, Javascript, Japan, Tokyo, Startups, Startup Otaku, Blog";

  return { title, description, keywords };
}