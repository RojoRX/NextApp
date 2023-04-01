import Link from 'next/link';
import { useRouter } from 'next/router';

function BlogPost({ post }) {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Link href="/">
        Volver a la página de inicio
      </Link>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const res = await fetch(`http://localhost:3001/blog`);
  const posts = await res.json();
  const post = posts.find((p) => p.title === slug);

  return {
    props: {
      post,
    },
  };
}

export default BlogPost;
