import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionsController from "./controllers/questionscontroller.js";
import * as questionController from "./controllers/questionController.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/topics", topicController.showTopicsPage);
router.post("/topics", topicController.addTopic);
router.post("/topics/:id/delete", topicController.deleteTopic)

router.get("/topics/:id", questionsController.showQuestionsPage);
router.post("/topics/:id/questions", questionsController.addQuestion);

router.get("/topics/:id/questions/:qId", questionController.showQuestionPage);
router.post("/topics/:id/questions/:qId/options", questionController.addAnswerOption);

export { router };
