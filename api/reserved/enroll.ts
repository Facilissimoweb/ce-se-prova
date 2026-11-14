import type { VercelRequest, VercelResponse } from '@vercel/node';
import { postReservedEnroll } from '../../src/server/routes/reserved.ts';
import {
  ensureSchemaOnce,
  methodNotAllowed,
  readBodyObject,
  requestOrigin,
  requireUser,
  sendApiResult,
} from '../../src/server/vercelAdapter.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await ensureSchemaOnce();
  if (req.method !== 'POST') {
    return methodNotAllowed(res, ['POST']);
  }
  const user = await requireUser(req, res);
  if (!user) return;
  return sendApiResult(
    res,
    await postReservedEnroll({
      user,
      body: readBodyObject(req),
      origin: requestOrigin(req),
    })
  );
}
