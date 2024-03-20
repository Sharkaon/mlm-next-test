'use client';

import { getCompletion } from "@/app/open-ai/actions";
import { MessageInterface } from "@/messages";
import { useState } from "react";
import { useFormState } from "react-dom";

export type ChatProps = {
  firstMessage: MessageInterface;
  userDefaultMessage?: string;
}

export default function Chat(props: ChatProps) {
  const [state, formAction] = useFormState(getCompletion, '');
  const [messages, setMessages] = useState([props.userDefaultMessage ?? '']);

  const addResult = (result: string) => {
    setMessages(messages.concat(result).concat(''));
  }

  return <div className='flex flex-col items-center'>
    <form action={formAction} className="h-80">
      <h4>A primeira mensagem é usada apenas para contextualizar o modelo de qual o seu papel para o usuário</h4>
      <textarea
        name='message'
        value={props.firstMessage.content}
        className='text-black w-full text-sm mb-3 rounded'
      />

      <h4>Após isso ela é intercalada por uma mensagem de usuário (escrita pelo usuário) e uma mensagem de assistente (que apenas reenvia o que o modelo já falou para que ele tenha o contexto da conversa)</h4>
      {messages.map(
        (message, index) =>
          <textarea
            key={index}
            name='message'
            defaultValue={message}
            className={`text-black w-full text-sm mb-3 rounded`}
            readOnly={index % 2 !== 0}
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
