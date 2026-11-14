import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getReservedOverview } from '../../src/server/routes/reserved.ts';
import {
  ensureSchemaOnce,
  methodNotAllowed,
  requireUser,
  sendApiResult,
} from '../_lib/vercelHandler.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await ensureSchemaOnce();
  if (req.method !== 'GET') {
    return methodNotAllowed(res, ['GET']);
  }
  const user = await requireUser(req, res);
  if (!user) return;
  return sendApiResult(res, await getReservedOverview(user));
}
