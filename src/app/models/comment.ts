export interface Comment {
  id: number;
  targetType: string;
  targetId: number;
  userId: number;
  content: string;
  publishedAt: string;
}
