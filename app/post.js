import { db } from "~/utils/db.server";
import { marked } from "marked";

export async function getPost(slug) {
  const foundSlug = await db.post.findFirst({
    where: {
      slug: slug,
    },
  });

  let title = foundSlug.title;
  let html = marked(foundSlug.markdown);
  let photo = foundSlug.photo;
  let description = foundSlug.description;
  let createdAt = foundSlug.createdAt.toLocaleDateString();

  return { slug, title, html, photo, description, createdAt };
}

export async function getPosts() {
  const data = {
    postListItems: await db.post.findMany({
      take: 20,
      select: {
        id: true,
        slug: true,
        title: true,
        markdown: true,
        photo: true,
        description: true,
      },
      orderBy: { createdAt: "desc" },
    }),
  };

  return data;
}

export async function getQueriedPosts(startup) {
  const data = {
    postListItems: await db.post.findMany({
      where: {
        title: startup || undefined,
      },
      orderBy: { createdAt: "desc" },
    }),
  };
  return data;
}

export async function createPost(post) {
  await db.post.create({
    data: {
      title: post.title,
      slug: post.slug,
      markdown: post.markdown,
      photo: post.photo,
      description: post.description,
    },
  });

  return getPost(post.slug);
}

export async function getPostEdit(slug) {
  const foundSlug = await db.post.findFirst({
    where: {
      slug: slug,
    },
  });

  let id = foundSlug.id;
  let title = foundSlug.title;
  let markdown = foundSlug.markdown;
  let photo = foundSlug.photo;
  let description = foundSlug.description;

  return { id, slug, title, markdown, photo, description };
}

export async function updatePost(post) {
  console.log("updatePost id", post.id);
  await db.post.update({
    where: {
      id: post.id,
    },
    data: {
      title: post.title,
      slug: post.slug,
      markdown: post.markdown,
      photo: post.photo,
      description: post.description,
    },
  });

  return getPost(post.slug);
}

export async function deletePost(post) {
  await db.post.delete({
    where: {
      id: post,
    },
  });

  return post;
}
