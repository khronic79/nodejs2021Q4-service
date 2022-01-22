// https://medium.com/netscape/mastering-koa-middleware-f0af6d327a69
import { Next, ParameterizedContext } from "koa";
import * as jwt from 'jsonwebtoken';
import { conf } from '../../common/config';
import { checkUrl } from './check.url';

export async function authProxyUrl(ctx: ParameterizedContext, next: Next): Promise<void> {
  const { url } = ctx;
  const check = checkUrl(url);
  if (!check) {
    await next();
  } else {
      const header = ctx.headers.authorization;
      if (!header) ctx.throw(401, 'There is not authorization header');
      const arrAuth = header?.split(' ').map(elem => elem.trim()) as string[];
      if (arrAuth.length < 2) ctx.throw(401, 'There is not valid authorization header');
      if (arrAuth[0] !== 'Bearer') ctx.throw(401, 'There is not valid authorization header');
      try {
        jwt.verify(arrAuth[1] as string, conf.JWT_SECRET_KEY);
      } catch (err) {
          ctx.throw(403, 'Token is not valid');
      }
       await next();
  }
}