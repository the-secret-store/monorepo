import { Request, Response } from 'express';
import * as morgan from 'morgan';
import * as pc from 'picocolors';

/**
 * Request Logging with morgan
 *
 * Logs all the requests received and some relevant information, this can be
 * helpful in development, but it is recommended to turn this off in production
 * to reduce the  request processing queue length. Using this in production may
 * affect the performance of your app and slow down your server.
 */

export const morganDevFormat: morgan.FormatFn = (tokens, req: Request, res: Response) => {
  const { statusCode, methodName, requestURL, responseLength, responseTime, time, date } =
    extractAttributes(tokens, req, res);

  const coloredStatus = colorizeStatusCodes(statusCode);
  const coloredMethod = colorizeMethod(methodName);
  const coloredLengthInBytes = customizeLength(responseLength);
  const coloredResponseTime = customizeResponseTime(responseTime);

  return `[${date} ${time}] ${coloredStatus} | ${coloredMethod} ${requestURL} | ${coloredLengthInBytes}, ${coloredResponseTime}`;
};

function extractAttributes(tokens, req: Request, res: Response) {
  /**
   * Extracts required attributes from the request
   */
  const statusCode = tokens.status(req, res);
  const methodName = tokens.method(req, res);
  const requestURL = truncate(tokens.url(req, res), 60);
  const responseLength = tokens.res(req, res, 'content-length');
  const responseTime = tokens['response-time'](req, res);
  const time = new Date(tokens.date(req, res)).toLocaleTimeString('en-US');
  const date = new Date(tokens.date(req, res)).toLocaleDateString('en-GB');

  return { statusCode, methodName, requestURL, responseLength, responseTime, time, date };
}

function colorizeStatusCodes(statusCode: number) {
  /**
   * Adds chalk colors to the status codes:
   * Code		|		Color
   * 1xx		|		gray
   * 2xx		|		green
   * 3xx		|		cyan
   * 4xx 		|		yellow
   * 5xx		|		red
   */

  if (statusCode < 200) return pc.gray(statusCode);
  if (statusCode < 300) return pc.green(statusCode);
  if (statusCode < 400) return pc.cyan(statusCode);
  if (statusCode < 500) return pc.yellow(statusCode);
  if (statusCode >= 500) return pc.red(statusCode);
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
function colorizeMethod(methodName: HttpMethod) {
  /**
   * Adds chalk colors to the Http request methods:
   * Method			|		Color
   * Get				|		blue
   * Post, Put		|		magenta
   * patch			|		yellow
   * delete 			|		red
   */
  switch (methodName) {
    case 'GET':
      return pc.blue(methodName);

    case 'POST':
    case 'PUT':
      return pc.magenta(methodName);

    case 'PATCH':
      return pc.yellow(methodName);

    case 'DELETE':
      return pc.red(methodName);

    default:
      return methodName;
  }
}

function customizeLength(length: number) {
  /**
   * Colorizes length string based on the value and adds 'B' as unit.
   * size < 600 => default
   * 600 <= size < 3000 => yellow
   * size >= 3000 => red
   */
  if (length >= 600 && length < 3000) return pc.yellow(`${length}B`);
  if (length >= 3000) return pc.red(`${length}B`);
  if (!length) return '0B';

  return `${length}B`;
}

function customizeResponseTime(resTime: number) {
  /**
   * Colorizes response time string based on the value and adds 'ms' as unit.
   * size < 500 => default
   * 500 <= size < 1000 => yellow
   * size >= 1000 => red
   */
  if (resTime >= 500 && resTime < 1000) return pc.yellow(`${resTime}ms`);
  if (resTime >= 1000) return pc.red(`${resTime}ms`);

  return `${resTime}ms`;
}

function truncate(str: string, n: number) {
  return str.length > n ? `${str.substring(0, n - 1)}...` : str;
}
