import express from 'express';
import path from 'node:path';
import authRouter from './routes/auth.routes.js'
import artistsRouter from './routes/artists.route.js'
import albumRouter from './routes/albums.routes.js'
import playlistsRouter from'./routes/playlists.routes.js'
import errorHandler from './middleware/errors.middleware.js';

const PORT = 3010

const app = express();

app.use(express.json())

app.get('/', ((req, res) => {
    res.status(200).json({ message: "Hello" })
}))

app.use('/api/uploads', express.static('uploads'))
app.use('/api/auth', authRouter)
app.use('/api/artists', artistsRouter)
app.use('/api/albums', albumRouter)
app.use('/api/playlists', playlistsRouter)


app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server start : http://localhost:${PORT}`)
})
