const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dscp8or.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const BossDB = client.db("BossDB");
        const menu = BossDB.collection("menu");
        const review = BossDB.collection("review");

        // menu
        // find all menu
        app.get('/menu', async (req, res) => {
            try {
                const result = await menu.find().toArray()
                res.send(result)
            } 
            catch (error) {
                console.log(error);
                res.send(error)
            }
        })

        // review
        // find all review
        app.get('/review', async(req, res) => {
            try {
                const result = await review.find().toArray()
                res.send(result)    
            } 
            catch (error) {
                console.log(error);
                res.send(error)
            }
        }) 

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Boss is sitting');
})
app.listen(port, () => {
    console.log(`Boss is sitting on port: ${port}`);
})