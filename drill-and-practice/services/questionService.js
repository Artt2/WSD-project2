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

export {addQuestion, listQuestions, findQuestionById};