import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";

const processLogin = async ({request, response, render, state}) => {
  const body = request.body({type: "form"});
  const params = await body.value;

  const userData = {
    email: params.get("email"),
    password: params.get("password"),
    errorMessage: "Invalid email or password!"
  }
  const userFromDatabase = await userService.findUserByEmail(params.get("email"));

  if (userFromDatabase.length !== 1) {
    render("login.eta", userData);
    return;
  }

  const user = userFromDatabase[0]
  const passwordMatches = await bcrypt.compare(userData.password, user.password)

  if (!passwordMatches) {
    render("login.eta", userData);
    return;
  }

  await state.session.set("user", user);
  response.redirect("/topics");
};

const showLoginForm = ({ render }) => {
  render("login.eta");
};

export {processLogin, showLoginForm}