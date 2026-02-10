import express  from 'express';

const PORT = 3010

const app = express();

app.use(express.json())

app.get('/', ((req, res) => {
    res.status(200).json({message: "Hello"})
}) )

app.listen(PORT, () => {
    console.log(`Server start : http://localhost:${PORT}`)
})
