import { Link} from "remix";
import { getPosts, getQueriedPosts } from "~/post";

export default function Index() {
  return (
    <div className="front-page">
      <h1>Welcome to Startup Otaku</h1>
    </div>
  );
}
