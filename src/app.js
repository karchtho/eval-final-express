import express from 'express';
import authRouter from './routes/auth.routes.js'

const PORT = 3010

const app = express();

app.use(express.json())

app.get('/', ((req, res) => {
    res.status(200).json({ message: "Hello" })
}))

app.use('/api/auth', authRouter)

app.listen(PORT, () => {
    console.log(`Server start : http://localhost:${PORT}`)
})
