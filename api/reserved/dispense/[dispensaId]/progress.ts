import { putDispensaProgress } from '../../../../src/server/routes/reserved.ts';
import {
  ensureSchemaOnce,
  methodNotAllowed,
  queryString,
  readBodyObject,
  requireUser,
  sendApiResult,
  type NodeLikeReq,
  type NodeLikeRes,
} from '../../../../src/server/vercelAdapter.ts';

export const config = { runtime: 'nodejs', maxDuration: 30 };

export default async function handler(req: NodeLikeReq, res: NodeLikeRes) {
  await ensureSchemaOnce();
  if (req.method !== 'PUT') {
    return methodNotAllowed(res, ['PUT']);
  }
  const user = await requireUser(req, res);
  if (!user) return;

  const dispensaId = Number(queryString(req.query?.dispensaId));

  return sendApiResult(
    res,
    await putDispensaProgress({
      user,
      dispensaId,
      body: readBodyObject(req),
    })
  );
}
