import express from 'express';
import authRoutes from './routes/auth.routes.js';
import "dotenv/config";
import {authMiddleware, authorize} from "./middleware/auth.middleware.js";
import cors from "cors";
import passwordRoutes from './routes/password.routes.js'

const app = express()
app.use(express.json())

//Le « Cross-origin resource sharing » (CORS) ou « partage des ressources entre origines multiples » (en français, moins usité) est un mécanisme qui consiste à ajouter des en-têtes HTTP afin de permettre à un agent utilisateur d'accéder à des ressources d'un serveur situé sur une autre origine que le site courant.

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(`/api/auth`, authRoutes);
app.get (`/`, authMiddleware, authorize([`ADMIN`,`MODERATOR`]), (req, res) => res.send(`Mon API fonctionne bien`))
app.use('/api/passwords', passwordRoutes)

export default app
