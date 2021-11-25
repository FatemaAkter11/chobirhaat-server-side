const { MongoClient } = require('mongodb');
const uri =
  "mongodb+srv://chobithaatAdmin:chobirHaat123@chobirhaatcluster.epn3u.mongodb.net/chobirhaat?retryWrites=true&w=majority";
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const images = client.db("chobirhaat").collection("images");
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
  //console.log("database connected");
});

app.get("/", (req, res) => {
  res.send("Welcome to CHOBIRHAAT");
});

