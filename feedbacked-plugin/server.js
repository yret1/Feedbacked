import express from "express";
import cors from "cors";
import path from "path";

const app = express();
app.use(cors());

// Serve the script as a static file
app.use("/script", express.static(path.resolve("./script.js")));

// Or create a route that sends the script content
app.get("/script.js", (req, res) => {
  res.type("application/javascript");
  res.send(`
    const submissionbox = document.createElement("section");

    submissionbox.style.position = "fixed";
    submissionbox.style.width = "300px";
    submissionbox.style.height = "200px";
    submissionbox.style.backgroundColor = "blue";
    submissionbox.style.bottom = "20px";
    submissionbox.style.right = "20px";
    submissionbox.style.borderRadius = "10px";
    submissionbox.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";

    document.body.appendChild(submissionbox);
  `);
});

app.listen(3002, () => {
  console.log("Running on port 3002");
});
