const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

require("dotenv").config();

//middlewares
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://IbrahimSikder:D2CbQ16MMP9U4E8j@cluster0.fomplst.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


