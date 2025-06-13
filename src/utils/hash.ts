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
