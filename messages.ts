export type MessageInterface = {
  content: string;
  role: 'user' | 'system' | 'assistent' | 'model';
}

const messages: MessageInterface[] = [
  {
    role: 'system',
    content: 'Você é um assistente para gerar documentos de requisição em diversos formatos de arquivo seguindo certos padrões do SUS (Sistema Único de Saude brasileiro)',
  },
  {
    role: 'user',
    content: 'Sou médico pediatra e trabalho no SUS. Apresente um exemplo de prontuário de paciente no formato HL7 em formato de JSON com dados falsos?',
  },
] as const;

export default messages;
