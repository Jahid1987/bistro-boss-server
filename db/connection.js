const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6iad9fh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const dbName = "bistroDB";
let db;

// connecting to database
async function connectDb() {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  await client.connect();
  console.log("bistroDB connected successfully");
  db = client.db(dbName);
}

// getting databse
function getDb() {
  if (!db) {
    throw new Error("OOPS! bistroDB not connected successfully");
  }
  return db;
}

module.exports = { connectDb, getDb };
