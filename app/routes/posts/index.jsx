import { Link, Outlet, useLoaderData, Form, useSearchParams } from "remix";
import { getPosts, getQueriedPosts } from "~/post";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const query = url.searchParams.getAll("query");
  const post = search.get("startup");
  return getQueriedPosts(post);
};

function PostsRoute() {
  const data = useLoaderData();
  const [params] = useSearchParams();

  return (
    <div className="posts-route">
      <div className="side-posts-list">
        <Form>
          <input
            // onChange={handleChange}
            className="posts-searchBar"
            type="text"
            name="startup"
            id="search"
            placeholder="Search..."
            autocomplete="off"
          />
        </Form>
        <ul>
          {data.postListItems.map((post) => (
            <li key={post.id} className="side-post-list">
              <Link to={post.slug}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="posts-list">
        <h1>Here are all the posts</h1>
        <ul>
          {data.postListItems.map((post) => (
            <li key={post.slug} className="card">
              <div className="left-side">
                <h2>{post.title}</h2>
                <p className="post-description">{post.description}</p>
                <Link to={post.slug}>Read More --></Link>
              </div>
              <div className="right-side">
                <img src={post.photo} alt="" className="post-photo" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PostsRoute;
