import { sql } from "../database/database.js";

const addAnswer = async (userID, questionID, optionID) => {
  await sql`INSERT INTO question_answers (user_id, question_id, question_answer_option_id) VALUES (${userID}, ${questionID}, ${optionID})`;
}

const listAnswers = async () => {
  return await sql`SELECT * FROM question_answers`;
}

export { addAnswer, listAnswers };