import { Router } from "express";
import pokedexController from "../controllers/pokemon.controller";
import { authenticate } from "../middlewares/auth.middleware";
import userController from "../controllers/user.controller";

const router = Router();

router.get("/list", pokedexController.getPokemonList);
router.get("/details/:id", authenticate, pokedexController.getPokemonDetails);

router.post("/add", authenticate, userController.addPokemontoPokedex);
router.get("/my-colection", authenticate, userController.myPokedex);
router.delete("/delete", authenticate, userController.deletePokemontoPokedex);

export default router;
