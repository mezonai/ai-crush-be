import { ExtractedUserMezonData, UserMezonData } from '@/modules/auth/types/auth.type';
import { BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';

function hmacSHA256(secret: string, data: string): Buffer {
  return crypto.createHmac('sha256', secret).update(data).digest();
}

function removeHashParam(query: string): string {
  const params = new URLSearchParams(query);
  params.delete('hash');
  return params.toString();
}

export function generateMezonHash(dataCheckString: string, appToken: string): string {
  const secretKey = hmacSHA256(appToken, 'WebAppData');

  return crypto.createHmac('sha256', secretKey).update(removeHashParam(dataCheckString)).digest('hex');
}

export function verifyMezonHash(
  webAppData: string,
  appToken: string,
  expiresTimeOffset: number,
): ExtractedUserMezonData {
  const decoded = decodeURIComponent(webAppData);
  const entries = new URLSearchParams(decoded);
  const rawData = Object.fromEntries(entries);
  const { hash, user, auth_date } = rawData;

  let userMezon: UserMezonData;
  try {
    userMezon = JSON.parse(user);
  } catch {
    throw new BadRequestException('Invalid user data in webAppData');
  }

  const timeNow = new Date().getTime() / 1000;
  const timeOffset = expiresTimeOffset;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isHashExpired = Number(auth_date) < timeNow - timeOffset;
  const hashGenerate = generateMezonHash(webAppData, appToken);
  // if (hashGenerate !== hash || isHashExpired) { // temporarily skip check if hash is expired
  if (hashGenerate !== hash) {
    throw new BadRequestException('Invalid hash');
  }
  return { hash, userMezon, auth_date };
}
