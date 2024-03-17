import Chat from "@/components/chat";
import messages from "@/messages";

export default function OpenAIExample() {
  return <>
    OpenAI<br/>
    <Chat messages={messages} /> 
  </>
}
