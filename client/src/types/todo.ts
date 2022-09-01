export interface ITodo {
  text: string;
}
export interface ITodoResponse {
  id: number;
  text: string;
  complete: boolean;
  createdAt: number;
  updatedAt?: number;
  author?: {
    id: number;
    username: string;
    email: string;
  };
}
