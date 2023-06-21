import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as registrationController from "./controllers/registrationController.js"

const router = new Router();

router.get("/", mainController.showMain);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

export { router };
