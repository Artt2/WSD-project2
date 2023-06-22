import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js"
import { validasaur } from "../../deps.js";

const userValidationRules = {
  email: [validasaur.required, validasaur.isEmail], //email has to be email
  password: [validasaur.required, validasaur.minLength(4)]  //password minimum length 4
}

const registerUser = async ({request, response, render}) => {
  const body = request.body({type: "form"});
  const params = await body.value;

  const userData = {
    email: params.get("email"),
    password: params.get("password")
  }
  // check validity of data
  const [passes, errors] = await validasaur.validate(userData, userValidationRules)

  //TODO: CHECK THAT CANT ADD SAME EMAIL

  const userFromDatabase = await userService.findUserByEmail(userData.email)  //try to find a user with given email
  
  if (userFromDatabase.length === 1) {  //if user already exists
    userData.userExistsError = "user already exists";
    render("registration.eta", userData)
  }
  else if (!passes) { //validation errors
    console.log(errors);
    userData.validationErrors = errors;
    render("registration.eta", userData)  //errors shown on page
  } else {
    const passwordHash = await bcrypt.hash(userData.password);
    await userService.addUser(userData.email, passwordHash);

    response.redirect("/auth/login");
  }
}

const showRegistrationForm = ({ render }) => {
  render("registration.eta");
}

export {registerUser, showRegistrationForm}