import { z } from 'zod';

export const messagesValidator = z.array(z.string().trim().min(1));

