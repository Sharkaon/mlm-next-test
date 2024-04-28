import { messagesValidator } from "@/schema";
import { getCompletionFromModel } from "../actions";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const messages = messagesValidator.parse(await request.json());
  const completion = await getCompletionFromModel(messages);

  return Response.json({ completion });
}
