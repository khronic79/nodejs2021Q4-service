import { Next, ParameterizedContext } from "koa";
import * as jwt from 'jsonwebtoken';
import { conf } from '../../common/config';

export async function authProxyService(ctx: ParameterizedContext, next: Next): Promise<void> {
  const header = ctx.headers.authorization;
  if (!header) ctx.throw(401, 'There is not authorization header');
  const arrAuth = header?.split(' ').map(elem => elem.trim()) as string[];
  if (arrAuth.length < 2) ctx.throw(401, 'There is not valid authorization header');
  if (arrAuth[0] !== 'Bearer') ctx.throw(401, 'There is not valid authorization header');
  const check = jwt.verify(arrAuth[1] as string, conf.JWT_SECRET_KEY);
  if (!check) ctx.throw(403, 'Token is not valid');
  next()
}