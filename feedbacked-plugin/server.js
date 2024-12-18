import express from "express";
import cors from "cors";
import path from "path";

const app = express();
app.use(cors());

// Serve the script as a static file
// app.use("/script", express.static(path.resolve("./script.js")));

// Or create a route that sends the script content
app.get("/script", (req, res) => {
  res.type("application/javascript");
  res.sendFile(path.resolve("./script.js"));
});

app.listen(3002, () => {
  console.log("Running on port 3002");
});
