const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connection = require("./db.js")
const { userRouter } = require("./routes/users.routes")


const app = express();

app.use(express.json());
app.use(cors());

app.get("/" , (req,res) => {
    res.status(200).send({msg: 'Home Router'})
})

app.use("/users" , userRouter)

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Connection Failed! Cannot connected to MongoDB!");
    }

    console.log("server is running on secure port");
})