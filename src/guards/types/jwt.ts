import { User, UserRoles } from '@/schemas/user.schema';

export type JWTPayload = {
  _id: string;
  role: UserRoles;
  iat: number;
  exp: number;
};

export type JWTAuth = JWTPayload & {
  user: User;
};
