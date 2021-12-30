import { Outlet, Link, useLoaderData } from "remix";
import { getPosts } from "~/post";

// import adminStyles from "~/styles/admin.css";
//create a stylesheet ref for the admin.css file
// export let links = () => {
//     return [{rel: "stylesheet", href: adminStyles}]
// }

export let loader = () => {
  return getPosts();
};

export default function Admin() {
  let data = useLoaderData();
  return (
    <>
      <div>
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
    </>
  );
}
