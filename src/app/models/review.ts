import { Comment } from './comment';

export interface Review {
  id: number;
  workId: number,
  userId: number;
  otherMedia?: string;
  createdAt: string;
  content: string;
}
