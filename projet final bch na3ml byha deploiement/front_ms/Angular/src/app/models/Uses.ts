// user.model.ts

export interface User {
  id: number;
  email: string;
  username: string; // Add the username property
  roles: string[];
  // Add other properties as needed
}
