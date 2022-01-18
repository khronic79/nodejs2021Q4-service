import { protectedUrl } from './protected.url';

export function checkUrl(url: string): boolean {
  let check = false;
  for (let i = 0; i < protectedUrl.length; i+=1) {
    const regExp = new RegExp(protectedUrl[i] as string);
    if (regExp.test(url)) {
      check = true;
      break;
    }
  }
  return check;
}