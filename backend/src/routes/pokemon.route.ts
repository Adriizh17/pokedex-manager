import { Router } from "express";
import pokedexController from "../controllers/pokemon.controller";
const router = Router();

router.get("/list", pokedexController.getPokemonList);
router.get("/details/:id", pokedexController.getPokemonDetails);
export default router;
