import { Link, Outlet, useLoaderData } from "remix";
import { getPosts } from "~/post";

// import stylesUrl from "../styles/posts.css";

// export const links: LinksFunction = () => {
//   return [
//     {
//       rel: "stylesheet",
//       href: stylesUrl
//     }
//   ];
// };

export const loader = async () => {
  return getPosts()
};

function PostsRoute() {
  const data = useLoaderData();
  return (
    <div>
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
