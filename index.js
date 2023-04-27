const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('simple node server runnig');
});


app.use(cors());
app.use(express.json());

// const users = [
//     {id: 1, name: 'sabana', email: 'sabana@gmail.com'},
//     {id: 2, name: 'sabina', email: 'sabina@gmail.com'},

//     {id: 3, name: 'sabanoor', email: 'sabnoor@gmail.com'},


// ]






const uri = "mongodb+srv://pulakbala0524:FSwdUL2j99yiHB9G@cluster0.jjuaebs.mongodb.net/?retryWrites=true&w=majority";

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
        const userCollection = client.db('simpleNode').collection('users');

       app.get('/users', async(req, res) =>{
        const cursor = userCollection.find({});
        const users = await cursor.toArray();
        res.send(users);
       })

        app.post('/users', async (req, res) =>{
            const user = req.body;
           
            const result =  await userCollection.insertOne(user);
            console.log(result);
            user._id = result.insertedId;
            res.send(user);
        })
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





// app.get('/users', (req, res) =>{
//     if(req.query.name){
//         const search = req.query.name;
//         const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0);
//         res.send(filtered);
//     }
//     res.send(users);
// })

// app.post('/users', (req, res) =>{
//     console.log('post api called');
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user);
//     console.log(user);
//     res.send(user);
// })

app.listen(port, () =>{
    console.log(`simple not server runnnig on port ${port}`);
})