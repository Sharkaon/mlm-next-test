import { getChatAnswer } from "../actions";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const answer = await getChatAnswer('', await request.formData());

  return Response.json({ answer });
}
