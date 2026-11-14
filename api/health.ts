type NodeLikeReq = { method?: string };
type NodeLikeRes = {
  statusCode: number;
  setHeader(name: string, value: string): void;
  end(body?: string): void;
};

export const config = { runtime: 'nodejs', maxDuration: 10 };

export default async function handler(_req: NodeLikeReq, res: NodeLikeRes) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify({ ok: true, service: 'ennamo' }));
}
