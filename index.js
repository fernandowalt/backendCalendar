const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/config");

require("dotenv").config();

// crear servidor
const app = express();

//DB
dbConnection();

//cors

app.use(cors());

//directorio publico

app.use(express.static("public"));

//parsear el body
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));

app.use("/api/events", require("./routes/events"));

//escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`server runed port ${process.env.PORT}`);
});
