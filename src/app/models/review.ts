import { Comment } from './comment';

export interface Review {
  id: number;
  reviewAuthor: string;
  author: string;
  otherMedia?: string;
  dateOfPublication: string;
  producer?: string;
  title: string;
  content: string;
  category: string;
  comments: Comment[];
}
