const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");

const port = 5000;
app.use(cors());
app.use(bodyParser.json());

const uri =
  "mongodb+srv://chobithaatAdmin:chobirHaat123@chobirhaatcluster.epn3u.mongodb.net/chobirhaat?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  const images = client.db("chobirhaat").collection("images");
  const users = client.db("chobirhaat").collection("users");
  const faq = client.db("chobirhaat").collection("faq");
  const contact = client.db("chobirhaat").collection("contact");
  // perform actions on the collection object

  app.post("/uploadimg", (req, res) => {
    const newimg = req.body;
    images.insertOne(newimg);
  });

  app.get("/gallery", (req, res) => {
    images.find({}).toArray((err, documents) => {
      res.send(documents.slice(0, 12));
    });
  });

  app.get("/image/:imgid", (req, res) => {
    images
      .find({ _id: ObjectId(req.params.imgid) })
      .toArray((err, documents) => {
        res.send(documents[0]);
      });
  });

  app.get("/category/:categoryid", (req, res) => {
    images
      .find({ category: req.params.categoryid })
      .toArray((err, documents) => {
        res.send(documents);
      });
  });

  app.get("/imagepending", (req, res) => {
    images.find({ status: "pending" }).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.patch("/payment/:imageid", (req, res) => {
    images
      .updateOne(
        { _id: ObjectId(req.params.imageid) },
        { $set: { trxid: req.body.trxid, status: req.body.status } }
      )
      .then((result) => res.send(result));
  });

  app.patch("/views/:imageid", (req, res) => {
    images
      .updateOne(
        { _id: ObjectId(req.params.imageid) },
        { $set: { views: req.body.views } }
      )
      .then((result) => res.send(result));
  });

  app.patch("/image/:imageid", (req, res) => {
    images
      .updateOne(
        { _id: ObjectId(req.params.imageid) },
        {
          $set: {
            trxid: req.body.trxid,
            status: req.body.status,
            buyer: req.body.buyer,
            buyeremail: req.body.buyeremail,
          },
        }
      )
      .then((result) => res.send(result));
  });

  app.patch("/comment/:imageid", (req, res) => {
    images
      .updateOne(
        { _id: ObjectId(req.params.imageid) },
        { $set: { comments: req.body } }
      )
      .then((result) => res.send(result));
  });

  //searching for images
  app.get("/search/:keyword", (req, res) => {
    images.find({ title: req.params.keyword }).toArray((err, documents) => {
      res.send(documents);
    });
  });

  //searching for users uploaded images
  app.get("/uploadedimages/:email", (req, res) => {
    images.find({ selleremail: req.params.email }).toArray((err, documents) => {
      res.send(documents);
    });
  });

  //deleting image
  app.delete("/image/:imgid", (req, res) => {
    images.deleteOne({ _id: ObjectId(req.params.imgid) }).then((result) => { });
  });

  // faq section
  app.post("/addfaq", (req, res) => {
    const newFaq = req.body;
    faq.insertOne(newFaq);
  });

  app.get("/faq", (req, res) => {
    faq.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  // user section
  app.get("/user/:mail", (req, res) => {
    users.find({ email: req.params.mail }).toArray((err, documents) => {
      res.send(documents[0]);
    });
  });

  app.get("/user/:id", (req, res) => {
    users.find({ email: req.params.id }).toArray((err, documents) => {
      res.send(documents[0]);
    });
  });

  app.post("/createuser", (req, res) => {
    const newuser = req.body;
    users.insertOne(newuser);
  });

  // user contact form
  app.post("/contactus", (req, res) => {
    const newmsg = req.body;
    contact.insertOne(newmsg).then(result => {
      res.send(result.insertedCount)
    })
  });

  app.get("/contactus", (req, res) => {
    contact.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  //console.log("database connected");
});

app.get("/", (req, res) => {
  res.send("Welcome to CHOBIRHAAT Website");
});

app.listen(process.env.PORT || port);
