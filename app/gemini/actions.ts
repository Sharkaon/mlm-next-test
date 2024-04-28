'use server';

import { messagesValidator } from "@/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";

function getMessagesWithRole(messages: string[]) {
  const messageToSend = messages.at(-1);

  const messagesWithRole = messages.map(
    (message, index) => ({
      parts: [{ text: message }],
      role: index % 2 === 0 ? 'user' as const : 'model' as const
    })
  );

  return {
    messagesWithRole: messagesWithRole,
    messageToSend,
  };
}

export async function getChatAnswer(currentState: string, formData: FormData): Promise<string> {
  const messages = formData.getAll('message');
  const validatedMessages = messagesValidator.parse(messages);

   return getAnswerFromModel(validatedMessages); 
}

export async function getAnswerFromModel(messages: string[]): Promise<string> {
  if (!process.env.GOOGLE_GEMINI_KEY) throw new Error('No Gemini Key in envs');

  const { 
    messagesWithRole,
    messageToSend,
  } = getMessagesWithRole(messages);

  const gemini = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY).getGenerativeModel({ model: 'gemini-pro' });

  const chat = gemini.startChat({ history: messagesWithRole });
  const result = await chat.sendMessage(messageToSend ?? '');

  const text = result.response.text();

  return text;
}

