import Chat from "@/components/chat";
import messages from "@/messages";
import { getCompletion } from "./actions";

export default function OpenAIExample() {
  return <>
    OpenAI<br/>
    <Chat
      firstMessage={messages[0]}
      userDefaultMessage={messages[1].content}
      action={getCompletion}
    /> 
  </>
}
