import express from "express"
const app = express();

app.use(express.json());

const users = []

// METHOD => GET, POST, PUT/PATCH, DELETE
// NAME => / - sempre no plural
// Callback functions => Onde executamos o backend (lógica, regra de negócio)

app.post("/users", (req, res) => {
    const body = req.body
    users.push(body)
    res.status(201).send("Usuário criao com sucesso!")
});

app.get("/users", (req, res) => {
    res.send({message: "Essa são os users", users})
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});