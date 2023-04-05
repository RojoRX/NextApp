import PostList from "./postlist";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Blog</h1>
      <PostList />
      <hr />
      <Link legacyBehavior href="/create-post">
        <a>Create Post</a>
      </Link>
    </div>
  );
}