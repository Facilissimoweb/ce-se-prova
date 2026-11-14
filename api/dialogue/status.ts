import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDialogueStatus } from '../../src/server/routes/dialogue.ts';
import {
  ensureSchemaOnce,
  methodNotAllowed,
  optionalUser,
  queryString,
  sendApiResult,
} from '../../src/server/vercelAdapter.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await ensureSchemaOnce();
  if (req.method !== 'GET') {
    return methodNotAllowed(res, ['GET']);
  }
  const user = await optionalUser(req);
  return sendApiResult(
    res,
    await getDialogueStatus({
      user,
      sessionKey: queryString(req.query.sessionKey),
    })
  );
}
