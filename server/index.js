const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
require('dotenv').config()   //install dotenv file

const app = express()
const port = process.env.PORT || 8000

// middlewares
app.use(cors())
app.use(express.json())

//DB_URI=aircnc-db
//Password=QQJKMvQvz98PNV2z


// Database Connection
const uri = process.env.DB_URI
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})

async function run() {
  try {
    const homesCollection = client.db('aircnc-db').collection('homes')
    const usersCollection = client.db('aircnc-db').collection('users')
    const bookingsCollection = client.db('aircnc-db').collection('bookings')

    //save user email & generate JWT
    app.put('/user/:email', async (req, res) => {
      const email = req.params.email
      const user = req.body
      const filter = { email: email }
      const options = { upsert: true }
      const updateDoc = {
        $set: user,
      }
      const result = await usersCollection.updateOne(filter, updateDoc, options)
      console.log(result)

      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1d' })
      console.log(token);
      res.send({ result, token })
    })


    // Get a single user by email

    app.get('/user/:email', async (req, res) => {
      const email = req.params.email
      const query = { email: email }

      const user = await usersCollection.findOne(query)
      console.log(user.role)
      res.send(user)
    })

    // Get All Users

    app.get('/users', async (req, res) => {
      const users = await usersCollection.find().toArray()
      console.log(users)
      res.send(users)
    })


    //save a booking
    app.post('/bookings', async (req, res) => {
      const bookingData = req.body
      const result = await bookingsCollection.insertOne(bookingData)
      console.log(result)
      res.send(result)
    })

    //get all bookings
    app.get('/bookings', async (req, res) => {
      let query = {}
      const email = req.query.email
      if (email) {
        query = {
          guestEmail: email,
        }
      }
      const booking = await bookingsCollection.find(query).toArray()
      console.log(booking)
      res.send(booking)
    })

    console.log('Database Connected...')
  }

  finally {

  }
}

run().catch(err => console.error(err))

app.get('/', (req, res) => {
  res.send('AirCnc server is running...')
})

app.listen(port, () => {
  console.log(`Server is running...on ${port}`)
})
