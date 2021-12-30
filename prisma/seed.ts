import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getPosts().map(post => {
      return db.post.create({ data: post });
    })
  );
}

seed();

function getPosts() {

  return [
    {
      title: "My First Post",
      slug: "my-first-post",
      markdown: "#This is my first post"
    },
  ];
}