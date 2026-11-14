import type { VercelRequest, VercelResponse } from '@vercel/node';
import { postDialogueCheckout } from '../../src/server/routes/dialogue.ts';
import {
  ensureSchemaOnce,
  methodNotAllowed,
  optionalUser,
  readBodyObject,
  requestOrigin,
  sendApiResult,
} from '../../src/server/vercelAdapter.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await ensureSchemaOnce();
  if (req.method !== 'POST') {
    return methodNotAllowed(res, ['POST']);
  }
  const user = await optionalUser(req);
  return sendApiResult(
    res,
    await postDialogueCheckout({
      user,
      body: readBodyObject(req),
      origin: requestOrigin(req),
    })
  );
}
