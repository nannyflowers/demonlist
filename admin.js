import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const PASSWORD = process.env.PASSWORD

app.post("/attempt_login", (req, res) => {
    const { password } = req.body;
    if (password == PASSWORD) {
        res.send("yep")
    } else {
        res.send("noope")
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'))