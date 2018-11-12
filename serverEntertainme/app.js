const express = require("express")
const app = express()
const cors = require('cors')
const routes = require('./routes')
const mongoose = require("mongoose")
const expressGraphql = require('express-graphql')
const schema = require('./schema')
require("dotenv").config();

const port = 3000

mongoose.connect(process.env.MONGO_LOCAL, { useNewUrlParser : true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongo connected");
});

app.use(cors());
app.use(express.urlencoded({extended : false}));
app.use(express.json())

app.use('/graphql', expressGraphql({
  schema,
  graphiql: true
}))

app.listen(port, () => {
  console.log('Listenitng on port ', port)
})