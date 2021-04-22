const faker = require('faker');

const db = require('../config/connection');
const { Post } = require('../models');

db.once('open', async () => {
  await Post.deleteMany({});

  // create Post data
  const postData = [];

  for (let i = 0; i < 20; i++) {
    const title = faker.name.title();
    const description = faker.lorem.paragraph();

    postData.push({ title, description });
  }
  await Post.collection.insertMany(postData);

  console.log('all done!');
  process.exit(0);
});