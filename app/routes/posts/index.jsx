import { Link, Outlet, useLoaderData } from "remix";
import { getPosts } from "~/post";

export const loader = async () => {
  return getPosts()
};

function PostsRoute() {
  const data = useLoaderData();
  return (
    <div className="posts-list">
      <h1>Here are all the posts</h1>
      <ul>
        {data.postListItems.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostsRoute;
