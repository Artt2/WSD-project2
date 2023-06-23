import { sql } from "../database/database.js";

const addAnswerOption = async (questionID, optionText, isCorrect) => {
  await sql`INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES (${questionID}, ${optionText}, ${isCorrect})`;
}

const listAnswerOptions = async (questionID) => {
  return await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionID}`
}

/*
  Deletes the answerOption and question answers for the answer option.
*/
const deleteAnswerOption = async (optionID) => {
  await sql`DELETE FROM question_answers WHERE question_answer_option_id = ${optionID}`;
  await sql`DELETE FROM question_answer_options WHERE id = ${optionID}`;
}

const rightAnswerExists = async (questionID) => {
  const rows = await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionID} AND is_correct = TRUE`;
  return rows.length > 0;
}

const findAnswerOptionsByQuestionId = async (questionID) => {
  return await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionID}`;
}

const isCorrectAnswerOption = async (questionID, optionID) => {
  const rows = await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionID} AND id = ${optionID}`;
  
  if (rows.length === 0) {
    return false;
  } else {
    return rows[0].is_correct;
  }
}

export {listAnswerOptions, addAnswerOption, deleteAnswerOption, rightAnswerExists, findAnswerOptionsByQuestionId, isCorrectAnswerOption};