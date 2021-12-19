import { ParameterizedContext } from 'koa';
import Router from 'koa-router';

/**
 * Send error message to client
 * 
 * @param ctx - KOA context object
 * @param errorMessage - Message text
 * @param status - Response status
 * 
 * @returns Void
 *
 */
export function sendErrorMessage(ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>, errorMessage: string, status: number) {
  ctx.body = {
    errorMessage,
    status
  };
  ctx.status = status;
}