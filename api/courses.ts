import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getCourses } from '../src/server/routes/courses.ts';
import {
  ensureSchemaOnce,
  methodNotAllowed,
  sendApiResult,
} from './_lib/vercelHandler.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await ensureSchemaOnce();
  if (req.method !== 'GET') {
    return methodNotAllowed(res, ['GET']);
  }
  return sendApiResult(res, await getCourses());
}
