const MongoClient = require("mongodb").MongoClient
const ObjectId = require("mongodb").ObjectId
const MongoError = require("mongodb").MongoError
require("dotenv").config()
;(async () => {
  try {
    const host = process.env.MFLIX_DB_URI
    const client = await MongoClient.connect(host, { useNewUrlParser: true })
    const mflix = client.db(process.env.MFLIX_NS)

    const baseballPlayers = [
      { insertOne: { _id: 11, name: "Edgar Martinez", salary: "8.5M" } }, // Insert #1
      { insertOne: { _id: 3, name: "Alex Rodriguez", salary: "18.3M" } }, // Insert #2
      { insertOne: { _id: 24, name: "Ken Griffey Jr.", salary: "12.4M" } }, // Insert #3
      { insertOne: { _id: 11, name: "David Bell", salary: "2.5M" } }, // Insert #4
      { insertOne: { _id: 19, name: "Jay Buhner", salary: "5.1M" } }, // Insert #5
    ]

    // TODO: Complete the BulkWrite statement below
    const { modifiedCount } = await mflix
      .collection("test")
      .bulkWrite(baseballPlayers)
    console.log("=== modifiedCount ===", modifiedCount)
    console.log("\x1b[32m", `${modifiedCount} documents updated`)
    client.close()
    process.exit(0)
  } catch (e) {
    if (
      e instanceof MongoError &&
      e.message.slice(0, "Invalid Operation".length) === "Invalid Operation"
    ) {
      console.log("\x1b[32m", "No documents to update")
    } else {
      console.error("\x1b[31m", `Error during migration, ${e}`)
    }
    process.exit(1)
  }
})()
