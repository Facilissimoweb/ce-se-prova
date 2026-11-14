import type { Request, Response } from 'express';
import type { AuthRequest } from '../middleware/auth.ts';
import {
  resolveRequestOrigin,
  type ApiResult,
  type ApiUser,
} from './http.ts';

export function toApiUserFromAuth(req: AuthRequest): ApiUser | null {
  if (!req.user?.uid) return null;
  return {
    uid: req.user.uid,
    email: req.user.email,
    name: typeof req.user.name === 'string' ? req.user.name : undefined,
  };
}

export function expressOrigin(req: Request, port: number): string {
  const originHeader =
    typeof req.headers.origin === 'string' ? req.headers.origin : undefined;
  return resolveRequestOrigin(originHeader, port);
}

export function sendResult(res: Response, result: ApiResult): void {
  res.status(result.status).json(result.body);
}

export function bodyRecord(req: Request): Record<string, unknown> {
  return (req.body && typeof req.body === 'object'
    ? req.body
    : {}) as Record<string, unknown>;
}
