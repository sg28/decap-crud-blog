import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('content/blog'));

  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join('content/blog', filename),
      'utf-8'
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      frontmatter,
      slug: filename.split('.')[0],
    };
  });

  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <a href={`/blog/${post.slug}`}>{post.frontmatter.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
