import { Link } from "remix";

export default function Index() {
  return (
    <>
      <h1>Welcome to Startup Otaku</h1>
      <Link to="/posts">Blog</Link>
      <Link to="/admin">Admin</Link>
    </>
  );
}
