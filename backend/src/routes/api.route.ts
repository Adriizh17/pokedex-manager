import { Router } from "express";
import pokemonRoute from "./pokemon.route";

const router = Router();

router.use("/pokemon", pokemonRoute);

export default router;
