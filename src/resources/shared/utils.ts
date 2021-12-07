import { ParameterizedContext } from 'koa';
import Router from 'koa-router';

export function sendErrorMessage(ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>, errorMessage: string, status: number) {
  ctx.body = {
    errorMessage,
    status
  };
  ctx.status = status;
}