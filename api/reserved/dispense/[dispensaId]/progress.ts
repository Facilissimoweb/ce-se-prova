import type { VercelRequest, VercelResponse } from '@vercel/node';
import { putDispensaProgress } from '../../../../src/server/routes/reserved.ts';
import {
  ensureSchemaOnce,
  methodNotAllowed,
  queryString,
  readBodyObject,
  requireUser,
  sendApiResult,
} from '../../../_lib/vercelHandler.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await ensureSchemaOnce();
  if (req.method !== 'PUT') {
    return methodNotAllowed(res, ['PUT']);
  }
  const user = await requireUser(req, res);
  if (!user) return;

  const dispensaId = Number(
    queryString(req.query.dispensaId) ||
      (typeof req.query.dispensaId === 'undefined'
        ? ''
        : String(req.query.dispensaId))
  );

  return sendApiResult(
    res,
    await putDispensaProgress({
      user,
      dispensaId,
      body: readBodyObject(req),
    })
  );
}
