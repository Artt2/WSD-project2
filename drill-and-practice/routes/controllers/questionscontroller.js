import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
  question: [validasaur.required, validasaur.minLength(1)]
}

const addQuestion = async ({ request, params, response, render, user}) => {
  const body = request.body({type: "form"});
  const bodyParams = await body.value;

  const topicID = params.id;

  const topicFromDatabase = await topicService.findTopicById(Number(topicID));

  const data = {
    question: bodyParams.get("question"),
    topic: topicFromDatabase[0],
    questions: await questionService.listQuestions(topicID),
  }

  const [passes, errors] = await validasaur.validate(data, questionValidationRules);

  if (!passes) {
    data.validationErrors = errors;
    render("questions.eta", data);
  } else {
    await questionService.addQuestion(user.id, topicID, data.question);
    response.redirect("/topics/" + topicID)
  }
}

const showQuestionsPage = async ({ params, render}) => {
  const topicID = params.id;

  const topicFromDatabase = await topicService.findTopicById(Number(topicID));

  const data = {
    topic: topicFromDatabase[0],
    questions: await questionService.listQuestions(topicID),
  }

  render("questions.eta", data);
}

export {addQuestion, showQuestionsPage};