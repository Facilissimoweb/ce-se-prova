/**
 * Dialogue group: status, checkout, confirm-stripe, unlock, interact.
 * Subpaths via vercel.json → /api/dialogue?__path=…
 */
import {
  groupSubpath,
  sendJson,
  type EntryReq,
  type EntryRes,
} from '../src/server/vercelEntry.ts';

export const config = { runtime: 'nodejs', maxDuration: 30 };

export default async function handler(req: EntryReq, res: EntryRes) {
  try {
    const method = (req.method || 'GET').toUpperCase();
    const path = groupSubpath(req, 'dialogue');

    const adapter = await import('../src/server/vercelAdapter.ts');
    await adapter.ensureSchemaOnce();

    if (path === 'status') {
      if (method !== 'GET') return adapter.methodNotAllowed(res as never, ['GET']);
      const { getDialogueStatus } = await import(
        '../src/server/routes/dialogue.ts'
      );
      const user = await adapter.optionalUser(req as never);
      return adapter.sendApiResult(
        res as never,
        await getDialogueStatus({
          user,
          sessionKey: adapter.queryString(req.query?.sessionKey),
        })
      );
    }

    if (path === 'interact') {
      if (method !== 'POST') return adapter.methodNotAllowed(res as never, ['POST']);
      const { postDialogueInteract } = await import(
        '../src/server/routes/dialogue.ts'
      );
      const user = await adapter.optionalUser(req as never);
      return adapter.sendApiResult(
        res as never,
        await postDialogueInteract({
          user,
          body: adapter.readBodyObject(req as never),
        })
      );
    }

    if (path === 'unlock') {
      if (method !== 'POST') return adapter.methodNotAllowed(res as never, ['POST']);
      const { postDialogueUnlock } = await import(
        '../src/server/routes/dialogue.ts'
      );
      const user = await adapter.optionalUser(req as never);
      return adapter.sendApiResult(
        res as never,
        await postDialogueUnlock({
          user,
          body: adapter.readBodyObject(req as never),
        })
      );
    }

    if (path === 'checkout') {
      if (method !== 'POST') return adapter.methodNotAllowed(res as never, ['POST']);
      const { postDialogueCheckout } = await import(
        '../src/server/routes/dialogue.ts'
      );
      const user = await adapter.optionalUser(req as never);
      return adapter.sendApiResult(
        res as never,
        await postDialogueCheckout({
          user,
          body: adapter.readBodyObject(req as never),
          origin: adapter.requestOrigin(req as never),
        })
      );
    }

    if (path === 'confirm-stripe') {
      if (method !== 'POST') return adapter.methodNotAllowed(res as never, ['POST']);
      const { postDialogueConfirmStripe } = await import(
        '../src/server/routes/dialogue.ts'
      );
      const user = await adapter.optionalUser(req as never);
      return adapter.sendApiResult(
        res as never,
        await postDialogueConfirmStripe({
          user,
          body: adapter.readBodyObject(req as never),
        })
      );
    }

    return sendJson(res, 404, { error: 'Not found', path, method });
  } catch (error) {
    console.error('api/dialogue handler failed:', error);
    return sendJson(res, 500, {
      error: 'Internal server error',
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}
