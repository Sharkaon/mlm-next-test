'use client';

import { getCompletion } from "@/app/open-ai/actions";
import { MessageInterface } from "@/messages";
import { useState } from "react";
import { useFormState } from "react-dom";

export type ChatProps = {
  messages: MessageInterface[];
}

export default function Chat(props: ChatProps) {
  const [state, formAction] = useFormState(getCompletion, '');
  const [messages, setMessages] = useState(props.messages.map(m => m.content));

  const addResult = (result: string) => {
    setMessages(messages.concat(result).concat(''));
  }

  return <div className='flex flex-col items-center'>
    <form action={formAction} className="h-80">
      {messages.map(
        (message, index) =>
          <textarea
            name={`message`}
            defaultValue={message}
            className={`text-black w-full text-sm mb-3 rounded`}
            readOnly={index % 2 === 0}
          />
      )}

      {state !== '' && <button
        className='bg-gray-800 mb-2 rounded-md text-lg pl-2 pr-2'
        onClick={() => addResult(state)}
      >+</button>} {state}<hr/>

      <button type='submit'>Próxima</button>
    </form>
  </div>
}
