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
    <div className="slug-page">
      <div className="slug">
        <div className="editor-section">
          <div className="img">
            <img className="postDisplayPhoto" src={post.photo} alt="" />
          </div>
          <div className="editor-info">
            <p>created by: poolside</p>
            <p>created at: {post.createdAt}</p>
          </div>
        </div>

        <div
          className="postDisplay"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </div>
  );
}

//Seo
export function meta({ data }) {
  const title = `${data.title}`;
  const description = `Information about ${data.title}`;
  const keywords = `Remix, React, Javascript, Japan, Tokyo, Startups, Startup Otaku, Blog, ${data.title}`;

  return { title, description, keywords };
}
