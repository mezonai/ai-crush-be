export type WebAppData = {
  query_id: string;
  user: string;
  auth_date: number;
  signature: string;
  hash: string;
};

export type UserMezonData = {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string;
  mezon_id: string;
};
