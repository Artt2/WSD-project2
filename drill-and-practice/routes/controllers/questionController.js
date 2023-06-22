import * as answerOptionService from "../../services/answerOptionService.js";
import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";

const answerOptionValidationRules = {
  answerOption: [validasaur.required, validasaur.minLength(1)]
}

const addAnswerOption = async ({ request, params, response, render, user}) => {
  const body= request.body({type: "form"});
  const bodyParams = await body.value;

  const topicID = params.id;
  const questionID = params.qId;

  const topicFromDatabase = await topicService.findTopicById(Number(topicID));
  const questionFromDatabase = await questionService.findQuestionById(Number(questionID));

  //TODO: checkbox should be populated

  const data = {
    topic: topicFromDatabase[0],
    question: questionFromDatabase[0],
    answerOptions: await answerOptionService.listAnswerOptions(questionID),
    answerOption: bodyParams.get("option_text")
  }

  const [passes, errors] = await validasaur.validate(data, answerOptionValidationRules);

  const correct = bodyParams.get("is_correct") === "on" ? true : false;

  if (!passes) {
    data.validationErrors = errors;
    render("question.eta", data);
  } else {
    await answerOptionService.addAnswerOption(questionID, data.answerOption, correct);
    response.redirect(`/topics/${topicID}/questions/${questionID}`);
  }
}

const showQuestionPage = async ({ params, render}) => {
  const topicID = params.id;
  const questionID = params.qId;

  const topicFromDatabase = await topicService.findTopicById(Number(topicID));
  const questionFromDatabase = await questionService.findQuestionById(Number(questionID));

  const data = {
    topic: topicFromDatabase[0],
    question: questionFromDatabase[0],
    answerOptions: await answerOptionService.listAnswerOptions(questionID),
  }
  render("question.eta", data);
}

export {addAnswerOption, showQuestionPage};