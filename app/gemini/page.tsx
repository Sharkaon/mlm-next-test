import Chat from '@/components/chat';
import messages from "@/messages";
import { getChatAnswer } from './actions';

export default function GeminiExample() {
  const googleFirstMessage = {
    content: messages[0].content,
    role: 'model' as const
  };

  return <>
    Gemini<br/>
    <Chat
      firstMessage={googleFirstMessage}
      userDefaultMessage={messages[1].content}
      action={getChatAnswer}
    />
  </>
}
