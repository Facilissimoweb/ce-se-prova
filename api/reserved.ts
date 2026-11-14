/**
 * Reserved (“serve”) group: overview, enroll, confirm-stripe, dispensa progress.
 * Multi-segment paths via vercel.json → /api/reserved?__path=…
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
    const path = groupSubpath(req, 'reserved');

    const adapter = await import('../src/server/vercelAdapter.ts');
    await adapter.ensureSchemaOnce();

    if (path === 'overview') {
      if (method !== 'GET') return adapter.methodNotAllowed(res as never, ['GET']);
      const { getReservedOverview } = await import(
        '../src/server/routes/reserved.ts'
      );
      const user = await adapter.requireUser(req as never, res as never);
      if (!user) return;
      return adapter.sendApiResult(res as never, await getReservedOverview(user));
    }

    if (path === 'enroll') {
      if (method !== 'POST') return adapter.methodNotAllowed(res as never, ['POST']);
      const { postReservedEnroll } = await import(
        '../src/server/routes/reserved.ts'
      );
      const user = await adapter.requireUser(req as never, res as never);
      if (!user) return;
      return adapter.sendApiResult(
        res as never,
        await postReservedEnroll({
          user,
          body: adapter.readBodyObject(req as never),
          origin: adapter.requestOrigin(req as never),
        })
      );
    }

    if (path === 'confirm-stripe') {
      if (method !== 'POST') return adapter.methodNotAllowed(res as never, ['POST']);
      const { postReservedConfirmStripe } = await import(
        '../src/server/routes/reserved.ts'
      );
      const user = await adapter.requireUser(req as never, res as never);
      if (!user) return;
      return adapter.sendApiResult(
        res as never,
        await postReservedConfirmStripe({
          user,
          body: adapter.readBodyObject(req as never),
        })
      );
    }

    const dispensaProgress = path.match(/^dispense\/([^/]+)\/progress$/);
    if (dispensaProgress) {
      if (method !== 'PUT') return adapter.methodNotAllowed(res as never, ['PUT']);
      const { putDispensaProgress } = await import(
        '../src/server/routes/reserved.ts'
      );
      const user = await adapter.requireUser(req as never, res as never);
      if (!user) return;
      return adapter.sendApiResult(
        res as never,
        await putDispensaProgress({
          user,
          dispensaId: Number(dispensaProgress[1]),
          body: adapter.readBodyObject(req as never),
        })
      );
    }

    return sendJson(res, 404, { error: 'Not found', path, method });
  } catch (error) {
    console.error('api/reserved handler failed:', error);
    return sendJson(res, 500, {
      error: 'Internal server error',
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}
