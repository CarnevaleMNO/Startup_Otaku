import { Link, Outlet } from "remix";

function AdminIndex() {
  return (
    <div>
        <Link to="new">
          {" "}
          <button className="btn">Create a New Post</button>
        </Link>
    </div>
  );
}

export default AdminIndex;
