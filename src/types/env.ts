export interface MezonEnv {
  appToken: string;
  expiresTimeOffset: string | number;
}

export interface AuthEnv {
  jwt: JwtConfigEnv;
}

export interface JwtConfigEnv {
  access: JwtSecret;
  refresh: JwtSecret;
}

export interface JwtSecret {
  expiresIn: string;
  secret: string;
}
