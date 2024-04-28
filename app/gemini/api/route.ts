import { messagesValidator } from "@/schema";
import { getAnswerFromModel } from "../actions";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const messages = messagesValidator.parse(await request.json());
  const answer = await getAnswerFromModel(messages);

  return Response.json({ answer });
}
