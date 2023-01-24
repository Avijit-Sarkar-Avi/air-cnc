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
