import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";

const showMain = async ({ render }) => {

  const data = {
    topics: await topicService.listTopics(),
    questions: await questionService.listAllQuestions(),
    answers: await answerService.listAnswers(),
  }

  render("main.eta", data);
};

export { showMain };