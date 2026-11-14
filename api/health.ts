type ReqLikeReq = { method?: string };
type ReqLikeRes = {
  statusCode: number;
  setHeader(name: string, value: string): void;
  end(body?: string): void;
};

export const config = { runtime: 'nodejs', maxDuration: 10 };

export default async function handler(_req: ReqLikeReq, res: ReqLikeRes) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify({ ok: true, service: 'ennamo' }));
}
