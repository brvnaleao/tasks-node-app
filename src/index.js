const express = require("express");
require("./db/mongoose");
const User = require("./model/User");
const Task = require("./model/Task");
const app = express();

const taskRouter = require("./routers/tasks");
const userRouter = require("./routers/users");

const port = process.env.PORT || 3000;

//setting up the MIDDLEWARES
app.use(express.json());
app.use(taskRouter);
app.use(userRouter);

app.listen(port, () => {
  console.log("server listen on port", port);
});

// const myFunction = async () => {
//   const pass = "minhaSenha123!";
//   const hashed = await bcryptjs.hash(pass, 8);

//   const isMatch = await bcryptjs.compare("minhaSenha123!", hashed);

//   console.log(isMatch);
// };

// myFunction();
