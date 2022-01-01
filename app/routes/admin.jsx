import { Outlet, Link, useLoaderData, Links } from "remix";
import { getPosts } from "~/post";

export let loader = () => {
  return getPosts();
};

export default function Admin() {
  let data = useLoaderData();
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
