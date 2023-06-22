import { sql } from "../database/database.js";

const addAnswerOption = async (questionID, optionText, isCorrect) => {
  await sql`INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES (${questionID}, ${optionText}, ${isCorrect})`;
}

const listAnswerOptions = async (questionID) => {
  return await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionID}`
}

export {listAnswerOptions, addAnswerOption};