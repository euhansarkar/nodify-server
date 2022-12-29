const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require(`express`);
const cors = require(`cors`);
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();


// middlewires

app.use(cors());
app.use(express.json());

app.get(`/`, (req, res) => {
  return res.send(`happy journey :)`);
});

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.3maypmf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const usersCollection = client.db("NodifyDB").collection("users");
    const postsCollection = client.db("NodifyDB").collection("posts");
    const reactionsCollection = client.db("NodifyDB").collection("reactions");
    const commentsCollection = client.db("NodifyDB").collection("comments");

    app.post(`/users`, async(req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      return res.send(result);
    })

    app.post(`/posts`, async(req, res) => {
      const user = req.body;
      const result = await postsCollection.insertOne(user);
      return res.send(result);
    })

    app.get(`/posts`, async(req, res) => {
      const query = {};
      const result = await postsCollection.find(query).toArray();
      return res.send(result);
    })

    app.get(`/posts/:id`, async(req, res) => {
      const id = req.params.id;
      const query = {id: ObjectId(id)};
      const result = await postsCollection.findOne(query);
      return res.send(result);
    })

    app.post(`/comments`, async(req, res) => {
      const comment = req.body;
      const result = await commentsCollection.insertOne(comment);
      return res.send(result);
    })

    app.get(`/comments`, async(req, res) => {
      const query = {};
      const result = await commentsCollection.find(query).toArray();
      return res.send(result);
    })

    app.post(`/reactions`, async(req, res) => {
      const reaction = req.body;
      const result = await reactionsCollection.insertOne(reaction);
      return res.send(result);
    })

    app.get(`/reactions`, async(req, res) => {
      const query = {};
      const result = await reactionsCollection.find(query).toArray();
      return res.send(result);
    })


  } finally {
  }
}

run().catch(console.dir)
