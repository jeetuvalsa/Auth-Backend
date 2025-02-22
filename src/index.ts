import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/user.route";
import connectDB from "./utils/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("Hello, TypeScript + Node.js!");
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
