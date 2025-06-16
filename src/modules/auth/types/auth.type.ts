export type WebAppData = {
  query_id: string;
  user: UserMezonData;
  auth_date: number;
  signature: string;
  hash: string;
};

export type UserMezonData = {
  id: string;
  username: string;
  avatar_url: string;
  mezon_id: string;
};

export type ExtractedUserMezonData = {
  hash: string;
  userMezon: UserMezonData;
  auth_date: string;
};
