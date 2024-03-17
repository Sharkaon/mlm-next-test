import Chat from "@/components/chat";
import messages from "@/messages";
import OpenAI from "openai";

const api = new OpenAI({
  apiKey: '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',
})

export default function OpenAIExample() {
  return <>
    OpenAI<br/>
    <Chat messages={messages} /> 
  </>
}
