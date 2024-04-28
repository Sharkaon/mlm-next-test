import { getCompletion } from "../actions";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  console.log({ request });
  const completion = await getCompletion('', await request.formData());

  return Response.json({ works: true, completion });
}
