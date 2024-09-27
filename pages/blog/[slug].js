import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('content/blog'));

  const paths = files.map((filename) => ({
    params: { slug: filename.replace('.md', '') },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join('content/blog', slug + '.md'),
    'utf-8'
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      content,
    },
  };
}

export default function PostPage({ frontmatter, content }) {
  return (
    <div>
      <h1>{frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
    </div>
  );
}
