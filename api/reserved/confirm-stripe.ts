import { postReservedConfirmStripe } from '../../src/server/routes/reserved.ts';
import {
  ensureSchemaOnce,
  methodNotAllowed,
  readBodyObject,
  requireUser,
  sendApiResult,
  type NodeLikeReq,
  type NodeLikeRes,
} from '../../src/server/vercelAdapter.ts';

export const config = { runtime: 'nodejs', maxDuration: 30 };

export default async function handler(req: NodeLikeReq, res: NodeLikeRes) {
  await ensureSchemaOnce();
  if (req.method !== 'POST') {
    return methodNotAllowed(res, ['POST']);
  }
  const user = await requireUser(req, res);
  if (!user) return;
  return sendApiResult(
    res,
    await postReservedConfirmStripe({
      user,
      body: readBodyObject(req),
    })
  );
}
