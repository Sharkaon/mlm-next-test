'use server';

import OpenAI from "openai";
import { ChatCompletionAssistantMessageParam, ChatCompletionSystemMessageParam, ChatCompletionUserMessageParam } from "openai/resources/index.mjs";
import { ChatCompletionMessageParam } from "openai/src/resources/index.js";

function getMessagesWithRole(messages: string[]): ChatCompletionMessageParam[] {
  const initialMessage: ChatCompletionSystemMessageParam = {
    content: messages.shift()!,
    role: 'system',
  }

  const nextMessages: Array<
    ChatCompletionUserMessageParam | ChatCompletionAssistantMessageParam
  > = messages.map(
    (message, index) => ({
      content: message,
      role: index % 2 == 0 ? 'user' : 'assistant'
    })
  );

  return [
    initialMessage,
    ...nextMessages
  ];
}

export async function getCompletion(currentState: string, formData: FormData): Promise<string> {
  const openai = new OpenAI({
    apiKey: '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',
  });

  const messages = formData.getAll('message') as string[];

  const messagesWithRole = getMessagesWithRole(messages);

  console.log(messagesWithRole);

  const completion = await openai.chat.completions.create({
    messages: messagesWithRole,
    model: 'gpt-3.5-turbo',
  });

  const message = completion.choices[0].message.content ?? '';

  return message; 
}
