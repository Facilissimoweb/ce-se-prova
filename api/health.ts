/** Zero-dependency probe — kept separate so Hobby deploys can prove the function runtime. */
export const config = { runtime: 'nodejs', maxDuration: 10 };

export default async function handler(
  _req: { method?: string },
  res: {
    statusCode: number;
    setHeader(name: string, value: string): void;
    end(body?: string): void;
  }
) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify({ ok: true, service: 'ennamo' }));
}
