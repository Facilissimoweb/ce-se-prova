import { getReservedOverview } from '../../src/server/routes/reserved.ts';
import {
  ensureSchemaOnce,
  methodNotAllowed,
  requireUser,
  sendApiResult,
  type NodeLikeReq,
  type NodeLikeRes,
} from '../../src/server/vercelAdapter.ts';

export const config = { runtime: 'nodejs', maxDuration: 30 };

export default async function handler(req: NodeLikeReq, res: NodeLikeRes) {
  await ensureSchemaOnce();
  if (req.method !== 'GET') {
    return methodNotAllowed(res, ['GET']);
  }
  const user = await requireUser(req, res);
  if (!user) return;
  return sendApiResult(res, await getReservedOverview(user));
}
