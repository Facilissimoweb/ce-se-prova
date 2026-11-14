export const config = { runtime: 'nodejs', maxDuration: 10 };

export default async function handler(req: { method?: string }, res: {
  statusCode: number;
  setHeader(n: string, v: string): void;
  end(b?: string): void;
}) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify({ ok: true, path: '/api/reserved/enroll' }));
}
