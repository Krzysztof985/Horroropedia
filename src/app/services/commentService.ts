import { Injectable, signal } from '@angular/core';
import { Comment } from '../models/comment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  comments = signal<Comment[]>([]);
  commentsLoaded = false;

  constructor(private http: HttpClient) { }

  loadComments() {
    if (this.commentsLoaded) {
      return;
    }

    this.http.get<Comment[]>('http://localhost:3000/api/comments')
      .subscribe(comments => {
        this.comments.set(comments);
        this.commentsLoaded = true;
      });
  }

  addComment(comment: Comment) {
    return this.http.post<Comment>(
      'http://localhost:3000/api/comments',
      comment
    );
  }

  getComments(targetType: string, targetId: number) {
    return this.comments().filter(comment =>
      comment.targetType === targetType &&
      comment.targetId === targetId
    );
  }
}
