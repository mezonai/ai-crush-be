type AppError = {
  message: string;
  code?: string;
};

export type ResponseData<T = null, U = object> = {
  meta: U;
  data?: T;
  error?: AppError;
};
