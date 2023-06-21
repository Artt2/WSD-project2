import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js"

const registerUser = async ({request, response}) => {
  const body = request.body({type: "form"});
  const params = await body.value;

  //TODO: CHECK VALIDITY 



}

const showRegistrationForm = ({ render }) => {
  render("registration.eta");
}

export {registerUser, showRegistrationForm}