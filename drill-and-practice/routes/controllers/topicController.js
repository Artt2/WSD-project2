import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";

const topicValidationRules = {
  name: [validasaur.required, validasaur.minLength(1)]
}

const addTopic = async ({ request, response, render, user }) => {
  const body = request.body({type: "form"});
  const params = await body.value;

  const data = {  //all data needed for rendering
    user: user,
    topics: await topicService.listTopics(),
    name: params.get("name"),
  }

  const [passes, errors] = await validasaur.validate(data, topicValidationRules); //validate

  if (!passes) {
    data.validationErrors = errors; //set validation errors to .eta
    render("topics.eta", data); //render again with errors
  } else {
    await topicService.addTopic(user.id, data.name);  //add new topic
    response.redirect("/topics"); //refresh page
  }
}

const showTopicsPage = async ({ render, user }) => {
  const data = {
    topics: await topicService.listTopics(),
    user: user
  }
  render("topics.eta", data);
}

/*
  "The application must verify on the server that only admins can create and remove topics.

  Once deleting of the topic has been done, the user is redirected to the path /topics.""
*/
const deleteTopic = async ({ params, response, user }) => {
  //check that user is admin
  if (!user.admin) {
    response.redirect("/topics");
  } else {
    const topicID = params.id;
    await topicService.deleteTopic(topicID);
    response.redirect("/topics");
  }
}

export {addTopic, showTopicsPage, deleteTopic};