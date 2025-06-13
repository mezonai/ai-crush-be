export interface MezonEnv {
  appToken: string;
  expiresTimeOffset: string | number;
}

export interface AuthEnv {
  jwt: JwtConfigEnv;
}

export interface JwtConfigEnv {
  secretKey: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
}
