import { sql } from "../database/database.js";

const addTopic = async (userID, name) => {
  await sql`INSERT INTO topics (user_id, name) VALUES (${userID}, ${name})`
}

const listTopics = async () => {
  return await sql`SELECT id, name FROM topics ORDER BY name ASC`;
}

/*
  "This removes the topic, 
  questions on the topic, 
  answer options related to questions on the topic, 
  and the answers given by users to those questions."
*/
const deleteTopic = async (topicID) => {

  await sql`
    DELETE 
    FROM question_answers 
    WHERE question_id in 
      (SELECT id 
      FROM questions
      WHERE topic_id = ${topicID}
      )
  `

  await sql`
    DELETE
    FROM question_answer_options 
    WHERE question_id in
      (SELECT id 
       FROM questions
       WHERE topic_id = ${topicID}  
      )
  `

  await sql`
    DELETE
    FROM questions
    WHERE topic_id = ${topicID}
  `
  
  await sql`DELETE FROM topics WHERE id = ${topicID}`;  //deletes the topic
}

const findTopicById = async (topicID) => {
  const rows = await sql`SELECT * FROM topics WHERE id = ${topicID}`;
  return rows;
}

export {addTopic, listTopics, deleteTopic, findTopicById}