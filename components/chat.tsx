'use client';

import { getCompletion } from "@/app/open-ai/actions";
import { MessageInterface } from "@/messages";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export type ChatProps = {
  firstMessage: MessageInterface;
  userDefaultMessage?: string;
  action: (currentState: string, formData: FormData) => Promise<string>;
}

export default function Chat(props: ChatProps) {
  const [state, formAction] = useFormState(props.action, '');
  const [messages, setMessages] = useState([props.userDefaultMessage ?? '']);
  const [waitingResponse, setWaitingRespone] = useState(false);
  const formStatus = useFormStatus();

  useEffect(() => {
    if (!waitingResponse) return;

    addResult(state);
    setWaitingRespone(false);
  }, [state]);

  const addResult = (result: string) => {
    setMessages(messages.concat(result).concat(''));
  }

  return <div className='flex flex-col items-center'>
    <form action={formAction} className="h-80 flex flex-col w-4/5" onSubmit={() => setWaitingRespone(true)}>
      <h4>A primeira mensagem é usada apenas para contextualizar o modelo de qual o seu papel para o usuário. Ela tem o role de {props.firstMessage.role}</h4>
      <textarea
        name='message'
        value={props.firstMessage.content}
        readOnly
        className='w-full text-sm mb-3 rounded border-none bg-gray-500 text-white cursor-text'
      />

      <h4>Após isso ela é intercalada por uma mensagem de usuário (escrita pelo usuário) e uma mensagem de assistente (que apenas reenvia o que o modelo já falou para que ele tenha o contexto da conversa)</h4>
      {messages.map(
        (message, index) =>
          index % 2 === 0 ? <UserInput
            key={index}
            message={message}
          />: <ResponseInput
            key={index}
            message={message}
          />
      )}

      {
        waitingResponse ? <p>Carregando...</p>
        : <button
            disabled={formStatus.pending}
            type='submit'
            className={
              `${formStatus.pending && 'text-gray-300'}`
            }
        >Próxima</button>
      }
    </form>
  </div>
}

const UserInput = (props: {
  message: string
}) => {
  const {
    message,
  } = props;

  return <textarea
    name='message'
    defaultValue={message}
    className={`text-black w-11/12 text-sm mb-3 rounded`}
  /> 
}

const ResponseInput = (props: {
  message: string
}) => {
  const {
    message,
  } = props;

  return <textarea
    name='message'
    defaultValue={message}
    className={`text-white w-11/12 text-sm mb-3 rounded bg-blue-600 self-end`}
    readOnly
  />
}
