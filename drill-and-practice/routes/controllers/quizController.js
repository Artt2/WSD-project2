import * as answerService from "../../services/answerService.js";
import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as answerOptionService from "../../services/answerOptionService.js";

const showQuizPage = async ({ render, user}) => {
  const data = {
    topics: await topicService.listTopics(),
    user: user
  }
  render("quiz.eta", data)
}

const findQuestion = async ({params, response, render, user}) => {
  const topicID = params.tId;

  const question = await questionService.randomQuestionByTopic(topicID);

  if (question.id) {  //if a question was returned
    const questionID = question.id;
    response.redirect(`/quiz/${topicID}/questions/${questionID}`);
  } else {
    const topic = await topicService.findTopicById(topicID);

    const data = {
      topics: await topicService.listTopics(),
      topic: topic[0],
      user: user
    }

    render("quiz.eta", data);
  }
}

const showQuestion = async ({params, render, user}) => {
  const topicID = params.tId;
  const questionID = params.qId;

  const question = await questionService.findQuestionById(questionID);
  const topic = await topicService.findTopicById(topicID);

  const data = {
    topic: topic[0],
    question: question[0],
    options: await answerOptionService.findAnswerOptionsByQuestionId(questionID),
    user: user
  }

  render("quizQuestion.eta", data);
}

const checkAnswer = async ({params, response, user}) => {
  const topicID = params.tId;
  const questionID = params.qId;
  const optionID = params.oId;
  const correct = await answerOptionService.isCorrectAnswerOption(questionID, optionID);
  
  await answerService.addAnswer(user.id, questionID, optionID);

  if (correct) {
    response.redirect(`/quiz/${topicID}/questions/${questionID}/correct`);
  } else {
    response.redirect(`/quiz/${topicID}/questions/${questionID}/incorrect`);
  }
}

const showCorrect = async ({params, render, user}) => {
  const topicID = params.tId;
  const topic = await topicService.findTopicById(topicID);

  const data = {
    topic: topic[0],
    correct: true,
    user: user
  }
  
  render("quizAnswer.eta", data)
}

const showIncorrect = async ({params, render, user}) => {
  const topicID = params.tId;
  const questionID = params.qId;

  const topic = await topicService.findTopicById(topicID);
  const question = await questionService.findQuestionById(questionID);

  const data = {
    topic: topic[0],
    question: question[0],
    correct: false,
    user: user
  }

  const correctOption = await answerOptionService.findCorrectByQuestionID(questionID);
  if (correctOption) {
    data.correctOption = correctOption[0];
  }

  render("quizAnswer.eta", data);
}

export { showQuizPage, findQuestion, showQuestion, checkAnswer, showCorrect, showIncorrect };