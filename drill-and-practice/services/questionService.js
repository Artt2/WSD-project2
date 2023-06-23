import { sql } from "../database/database.js";

const addQuestion = async (userID, topicID, questionText) => {
  await sql`INSERT INTO questions (user_id, topic_id, question_text) VALUES (${userID}, ${topicID}, ${questionText})`;
}

const listQuestions = async (topicID) => {
  return await sql`SELECT * FROM questions WHERE topic_id = ${topicID}`;
}

const findQuestionById = async (questionID) => {
  const rows = await sql`SELECT * FROM questions WHERE id = ${questionID}`;
  return rows;
}
/*
  Doesn't need to delete anything else.
  deleteAnswerOption deletes the options and the answers.
*/
const deleteQuestion = async (questionID) => {
  await sql`DELETE FROM questions WHERE id = ${questionID}`;
}

const randomQuestion = async () => {
  const rows = await sql`SELECT * from questions`;
  if (rows.length !== 0) {
    //random int between 0 and length - 1
    const randomIndex = Math.floor(Math.random() * rows.length); 
    
    return rows[randomIndex];
  } else {
    return {};
  }
}

const questionExists = async (questionID) => {
  const rows = await sql`SELECT * FROM questions WHERE id = ${questionID}`;
  if (rows.length === 0) {
    return false;
  } else {
    return true;
  }
}

export {addQuestion, listQuestions, findQuestionById, deleteQuestion, randomQuestion, questionExists};