import { db } from "~/utils/db.server";
import { marked } from "marked";

// this function is used to load a single post from a passed through slug
export async function getPost(slug) {
  // we will find the first database entry that matches the passed slug
  const foundSlug = await db.post.findFirst({
    where: {
      slug: slug,
    },
  });

  //let's extract the title
  let title = foundSlug.title;
  // using marked, we are going to convert the markdown into HTML so the blog post can render as entered in Markdown.
  let html = marked(foundSlug.markdown);

  // let's send back the slug, the title, and our markdown converted to html
  return { slug, title, html };
}

//This function is to fetch posts from the db
export async function getPosts() {
  const data = {
    postListItems: await db.post.findMany({
      take: 20,
      select: { id: true, slug: true, title: true, markdown: true },
      orderBy: { createdAt: "desc" },
    }),
  };

  return data;
}

//This function is to create posts and add them to the db
export async function createPost(post) {
  await db.post.create({
    data: {
      title: post.title,
      slug: post.slug,
      markdown: post.markdown,
    },
  });
  
  return getPost(post.slug);
}
