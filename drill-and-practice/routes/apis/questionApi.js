import * as questionService from "../../services/questionService.js";
import * as answerOptionService from "../../services/answerOptionService.js";

const randomQuestion = async ({ response }) => {

  const question = await questionService.randomQuestion();

  if (question.length === 0) {
    response.body = {};
    return;
  }

  const options = await answerOptionService.findAnswerOptionsByQuestionId(question.id);

  for (let i = 0; i < options.length; i++) {
    options[i].optionId = options[i].id;
    options[i].optionText = options[i].option_text;

    delete options[i].id;
    delete options[i].question_id;
    delete options[i].option_text;
    delete options[i].is_correct;
  }

  question.questionId = question.id;
  question.questionText = question.question_text;
  question.answerOptions = options;

  delete question.id;
  delete question.user_id;
  delete question.topic_id;
  delete question.question_text;

  response.body = question;
}

const respondWithAnswer = async ({ request, response }) => {
  const body = request.body({type: "json"});
  const document = await body.value;

  const questionID = document.questionId;
  const optionID = document.optionId;
  
  const questionExists = await questionService.questionExists(questionID);

  if (!(questionExists)) {  //return false if question doesnt exist
    response.body = {correct: false};
    return;
  }

  const correct = await answerOptionService.isCorrectAnswerOption(questionID, optionID);

  if (correct) {  //if optionID is correct and a question of questionID, return true
    response.body = {correct: true};
  } else {
    response.body = {correct: false};
  }
}
export {randomQuestion, respondWithAnswer}