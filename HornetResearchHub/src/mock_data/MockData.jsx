import faker from "@faker-js/faker";

const generateMockPosts = (count = 10) => {
  const mockPosts = [];

  for (let i = 0; i < count; i++) {
    const post = {
      id: i + 1,
      created_at: faker.date.recent(),
      user_id: faker.datatype.number({ min: 1, max: 100 }),
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      image_url: faker.image.imageUrl(),
      video_url: faker.internet.url(),
      upvotes: faker.datatype.number({ min: 0, max: 1000 }),
      tags: Array.from({ length: 3 }, () => ({
        id: faker.datatype.number({ min: 1, max: 100 }),
        created_at: faker.date.recent(),
        name: faker.lorem.word(),
      })),
      comments: Array.from({ length: 5 }, () => ({
        id: faker.datatype.number({ min: 1, max: 1000 }),
        created_at: faker.date.recent(),
        user_id: faker.datatype.number({ min: 1, max: 100 }),
        post_id: i + 1,
        content: faker.lorem.sentences(),
        image_url: faker.image.imageUrl(),
        video_url: faker.internet.url(),
      })),
    };

    mockPosts.push(post);
  }

  return mockPosts;
};

export default generateMockPosts;
