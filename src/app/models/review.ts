import { Comment } from './comment';

export interface Review {
  id: number;
  workId: number,
  reviewAuthor: string;
  otherMedia?: string;
  createdAt: string;
  content: string;
  comments: Comment[];
}
