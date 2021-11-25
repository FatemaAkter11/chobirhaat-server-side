const { MongoClient } = require('mongodb');
const uri =
  "mongodb+srv://chobithaatAdmin:chobirHaat123@chobirhaatcluster.epn3u.mongodb.net/chobirhaat?retryWrites=true&w=majority";
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});