import { Router } from "express";
import pokemonRoute from "./pokemon.route";
import authRoute from "./auth.route";

const router = Router();

router.use("/pokemon", pokemonRoute);
router.use("/auth", authRoute);

export default router;
