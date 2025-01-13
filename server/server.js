import OpenAI from 'openai';
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your .env file contains the correct API key
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello from Astra!' });
});

app.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({ bot: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message || 'Something went wrong' });
  }
});

app.listen(5000, () => console.log('AI server started on http://localhost:5000'));
