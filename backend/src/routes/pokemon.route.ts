import { Router } from "express";
import pokedexController from "../controllers/pokemon.controller";
import { authenticate } from "../middlewares/auth.middleware";
import userController from "../controllers/user.controller";

const router = Router();

router.get("/list", pokedexController.getPokemonList);
router.get("/details/:id", authenticate, pokedexController.getPokemonDetails);
router.get(
	"/description/:pokemonName",
	authenticate,
	pokedexController.getDescription
);
router.post(
	"/analyze-image",
	authenticate,
	pokedexController.analyzeImage
);

router.post("/add", authenticate, userController.addPokemontoPokedex);
router.get("/my-colection", authenticate, userController.myPokedex);
router.delete("/delete", authenticate, userController.deletePokemontoPokedex);
router.get("/analise", authenticate, userController.checkMyPokedex);

export default router;
