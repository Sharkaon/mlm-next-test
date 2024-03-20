import Chat from "@/components/chat";
import messages from "@/messages";

export default function OpenAIExample() {
  return <>
    OpenAI<br/>
    <Chat firstMessage={messages[0]} userDefaultMessage={messages[1].content} /> 
  </>
}
