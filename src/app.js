import express from "express"; //add "type": "module" in package.json for this syntax
import gamesRoutes from './routes/games.routes.js';
import indexRoutes from './routes/index.routes.js';


const app = express()
//
app.use(express.json())
//
app.use(indexRoutes)
app.use("/api", gamesRoutes)

// for no set routes
app.use((req, res, next) => {
  res.status(404).json({
    message: "No content",
  });
})

export default app;