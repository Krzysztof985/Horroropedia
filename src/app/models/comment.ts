export interface Comment {
  id: number;
  targetType: string;
  targetId: number;
  userId: number | null;
  content: string;
  publishedAt: string;
}
