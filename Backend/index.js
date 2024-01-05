const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;

const connectToMongoose = require("./db/index");

app.use(cors());
app.use(express.json());

connectToMongoose();

app.use("/student", require("./routes/student"));
app.use("/admin", require("./routes/admin"));
app.use("/faculty", require("./routes/faculty"));
app.use("/course", require("./routes/course"));

app.get("/", (req, res) => {
  res.send("Hello IRIS");
});

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
