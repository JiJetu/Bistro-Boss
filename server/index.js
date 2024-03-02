const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
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
        const paymentCollection = BossDB.collection("payments");

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
                $set: {
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


        // payment intent
        app.post('/create-payment-intent', async (req, res) => {
            try {
                const { price } = req.body;

                // // Validate price
                // if (isNaN(price)) {
                //     throw new Error('Invalid price value');
                // }

                const amount = parseInt(price * 100);
                console.log('amount inside the intent', amount);

                const paymentIntent = await stripe.paymentIntents.create({
                    amount: amount,
                    currency: 'usd',
                    payment_method_types: ['card']
                });

                res.send({
                    clientSecret: paymentIntent.client_secret
                });
            } catch (error) {
                console.error('Error processing payment intent:', error);
                res.status(500).send({ error: 'Error processing payment intent' });
            }
        });

        app.get('/payments/:email', verifyToken, async (req, res) => {
            const query = { email: req.params.email };
            if (req.params.email !== req.decoded.email) {
                return res.status(403).send({ massage: 'forbidden access' })
            }
            const result = await paymentCollection.find().toArray();
            res.send(result)
        })

        app.post('/payments', async (req, res) => {
            const payment = req.body;
            const paymentResult = await paymentCollection.insertOne(payment);

            // carefully delete each item from the cart
            const query = {
                _id: {
                    $in: payment.cardIds.map(id => new ObjectId(id))
                }
            }
            const deleteResult = await cartsCollection.deleteMany(query);

            res.send({ paymentResult, deleteResult })
        })


        // stats or analytics
        app.get('/admin-stats', verifyToken, verifyAdmin, async (req, res) => {
            const users = await userCollection.estimatedDocumentCount();
            const menuItems = await menuCollection.estimatedDocumentCount();
            const orders = await paymentCollection.estimatedDocumentCount();

            // // this is not the best way
            // const payments =await paymentCollection.find().toArray();
            // const revenue = payments.reduce((total, payment) => total + payment.price, 0)


            // the best way
            const result = await paymentCollection.aggregate([
                {
                    $group: {
                        _id: null,
                        totalRevenue: {
                            $sum: '$price'
                        }
                    }
                }
            ]).toArray();

            const revenue = result.length > 0 ? result[0].totalRevenue : 0;

            res.send({
                users,
                menuItems,
                orders,
                revenue
            })
        })

        // using aggregate pipeline
        app.get('/order-state', async (req, res) => {
            const result = await paymentCollection.aggregate([
                {
                    $unwind: '$menuIds'
                },
                 // Convert string ID to ObjectId before the lookup
                {
                    $addFields: {
                        "convertedMenuId": { $toObjectId: "$menuIds" }
                    }
                },
                {
                    $lookup: {
                        from: 'menu',
                        localField: 'convertedMenuId',
                        foreignField: '_id',
                        as: 'menuItems'
                    }
                },
                {
                    $unwind: '$menuItems'
                },
                {
                    $group: {
                        _id: '$menuItems.category',
                        quantity: { $sum: 1 },
                        revenue: { $sum: '$menuItems.price' }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        category: '$_id',
                        quantity: '$quantity',
                        revenue: '$revenue'
                    }
                }
            ]).toArray()

            res.send(result)
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