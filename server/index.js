const express = require('express')
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const jwt = require('jsonwebtoken');
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
        const userCollection = BossDB.collection("users");
        const menuCollection = BossDB.collection("menu");
        const reviewCollection = BossDB.collection("review");
        const cartsCollection = BossDB.collection("carts");

        // jwt related api--------------------
        app.post('/jwt', async (req, res) => {
            try {
                const user = req.body;
                const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '1h'
                })
                res.send({ token })
            } catch (error) {
                console.log(error);
                res.send(error)
            }
        })

        // middlewares
        const verifyToken = (req, res, next) => {
            try {
                console.log("inside verify token", req.headers.authorization);
                if (!req.headers.authorization) {
                    return res.status(401).send({ massage: 'unauthorized access' })
                }
                const token = req.headers.authorization.split(' ')[1]
                jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
                    if (error) {
                        return res.status(401).send({ massage: 'unauthorized access' })
                    }
                    req.decoded = decoded;
                    next();
                })
            } catch (error) {
                console.log(error);
                res.send(error)
            }
        }

        // use verifyAdmin after verifyToken
        const verifyAdmin = async (req, res, next) => {
            try {
                const email = req.decoded.email;
                const query = { email: email };
                const user = await userCollection.findOne(query);
                const isAdmin = user?.role === 'admin'
                if (!isAdmin) {
                    res.status(403).send({ massage: 'forbidden access' })
                }
                next()
            } catch (error) {
                console.log(error);
                res.send(error)
            }
        }

        // user related api------------------
        app.get('/users', verifyToken, verifyAdmin, async (req, res) => {
            try {
                const result = await userCollection.find().toArray();
                res.send(result);
            } catch (error) {
                console.log(error);
                res.send(error)
            }
        })

        app.get('/users/admin/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            if (email !== req.decoded.email) {
                return res.status(403).send({ massage: 'forbidden access' })
            }
            const query = { email: email };
            const user = await userCollection.findOne(query);
            let admin = false;
            if (user) {
                admin = user?.role === 'admin'
            }
            res.send({ admin })
        })

        app.post('/users', async (req, res) => {
            try {
                const user = req.body;
                // insert email if user doesn't exist
                const email = user.email;
                const query = { email: email }
                const existingUser = await userCollection.findOne(query);
                if (existingUser) {
                    return res.send({ message: "user already exist", insertedId: null })
                }
                const result = await userCollection.insertOne(user);
                res.send(result);
            } catch (error) {
                console.log(error);
                res.send(error)
            }
        })

        app.patch('/users/admin/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    role: 'admin'
                }
            }
            const result = await userCollection.updateOne(filter, updatedDoc);
            res.send(result)
        })

        app.delete('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const result = await userCollection.deleteOne(query);
                res.send(result);
            } catch (error) {
                console.log(error);
                res.send(error)
            }
        })


        // menu
        // find all menu
        app.get('/menu', async (req, res) => {
            try {
                const result = await menuCollection.find().toArray()
                res.send(result)
            }
            catch (error) {
                console.log(error);
                res.send(error);
            }
        })
        // find single item
        app.get('/menu/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) }
                const result = await menuCollection.findOne(query);
                res.send(result)
            } catch (error) {
                console.log(error);
                res.send(error);
            }
        })

        app.post('/menu', verifyToken, verifyAdmin, async (req, res) => {
            try {
                const item = req.body;
                const result = await menuCollection.insertOne(item);
                res.send(result);
            } catch (error) {
                console.log(error);
                res.send(error)
            }
        })

        app.patch('/menu/:id', async (req, res) => {
            const item = req.body
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set:{
                   name: item.name,
                   price: item.price,
                   recipe: item.recipe,
                   category: item.category,
                   image: item.image 
                }
            }
            const result = await menuCollection.updateOne(filter, updatedDoc);
            res.send(result);
        })

        app.delete('/menu/:id', verifyToken, verifyAdmin, async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const result = await menuCollection.deleteOne(query);
                res.send(result)
            } catch (error) {
                console.log(error);
                res.send(error)
            }
        })



        // review
        // find all review
        app.get('/review', async (req, res) => {
            try {
                const result = await reviewCollection.find().toArray()
                res.send(result)
            }
            catch (error) {
                console.log(error);
                res.send(error)
            }
        })

        // carts
        // find all carts collection
        app.get('/carts', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const result = await cartsCollection.find(query).toArray();
            res.send(result)
        })
        // create cart collection
        app.post('/carts', async (req, res) => {
            try {
                const cartItem = req.body;
                const result = await cartsCollection.insertOne(cartItem)
                res.send(result)
            } catch (error) {
                console.log(err);
                res.send(err)
            }
        })

        app.delete('/carts/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) }
                const result = await cartsCollection.deleteOne(query);
                res.send(result);
            } catch (error) {
                console.log(err);
                res.send(err)
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