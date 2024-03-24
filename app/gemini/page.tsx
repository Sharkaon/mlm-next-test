import Chat from '@/components/chat';
import messages, { MessageInterface } from "@/messages";

export default function GeminiExample() {
  const googleMessages: MessageInterface = messages.map(
    (message) => message.role === 'system' ? {
      ...message,
      role: 'assistant' as const,
    } : message
  );

  return <>
    Gemini<br/>
    <Chat firstMessage={googleMessages[0]} userDefaultMessage={googleMessages[1].content} />
  </>
}
