const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

require("dotenv").config();

//middlewares
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://IbrahimSikder:D2CbQ16MMP9U4E8j@cluster0.fomplst.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {
    const usersCollection = client.db("socialMediaApp").collection("Users");
    const postsCollection = client.db("socialMediaApp").collection("posts");
    const commentsCollection = client.db("socialMediaApp").collection("comments");

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    app.get("/details/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const details = await postsCollection.findOne(query);
      res.send(details);
    });

    app.get("/about", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const about = await usersCollection.find(query).toArray();
      res.send(about);
    });


    //get comments on front-end
    app.get("/comment", async (req, res) => {
      const post_id = req.query.post_id;
      const query = { post_id: post_id };

      const comment = await commentsCollection.find(query).toArray();
      res.send(comment);
    });

    app.post("/posts", async (req, res) => {
      const post = req.body;
      const result = await postsCollection.insertOne(post);
      res.send(result);
    });
    

    //update about section
    app.put("/aboutupdate/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const user = req.body;
      console.log(user);
      const option = { upsert: true };
      const updatedUser = {
        $set: {
          name: user.name,
          email: user.email,
          university: user.university,
          address: user.address,
        },
      };
      const result = await usersCollection.updateOne(
        filter,
        updatedUser,
        option
      );
      res.send(result);
    });

    app.put("/updatelike/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const like = req.body;
      // console.log(like);
      const option = { upsert: true };
      const updatedlike = {
        $set: {
          likes: like.like,
        },
      };
      const result = await postsCollection.updateOne(
        filter,
        updatedlike,
        option
      );
      res.send(result);
    });
  } finally {
  }
}
run().catch((error) => console.log(error));
app.get("/", (req, res) => {
  res.send("social media server is running ");
});

app.listen(port, () => {
  console.log("server listening on port" + port);
});