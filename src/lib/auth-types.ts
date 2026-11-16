/** Serializable session user shared by server pages and client components. */
export type SessionUser = {
  id: string;
  username: string;
  email: string;
  createdAt: number;
};
