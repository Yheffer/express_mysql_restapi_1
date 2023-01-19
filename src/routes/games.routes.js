import {application, Router} from 'express';
import {getGames, getGame, createGames, updateGames, deleteGames} from '../controllers/games.controller.js';

const router = Router();

router.get("/games", getGames)

router.get("/games/:id", getGame)

router.post("/games", createGames)

router.patch("/games/:id", updateGames)

router.delete("/games/:id", deleteGames)

export default router