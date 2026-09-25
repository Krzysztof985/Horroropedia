import { Component, input } from '@angular/core';
import { Review } from '../../models/review';
import { CommentComponent } from '../../comments/comment/comment'
import { CommentFormComponent } from '../../comments/commentForm/commentForm'
import { Comment } from '../../models/comment';
import { WorkService } from '../../services/workService';
import { CommentService } from '../../services/commentService'
import { UserService } from '../../services/userService';

@Component({
  selector: 'app-review',
  imports: [CommentComponent, CommentFormComponent],
  templateUrl: './review.html',
  styleUrl: './review.scss'
})
export class ReviewComponent {
  showComments = false;
  review = input.required<Review>();
  constructor(
    private workService: WorkService,
    private commentService: CommentService,
    private userService: UserService
  ) {
    this.commentService.loadComments();
  }
  get work() {
    return this.workService.works().find(
      work => work.id === this.review().workId
    );
  }
  get comments() {
    return this.commentService.getComments(
      'review',
      this.review().id
    );
  }
  addComment(comment: Comment) {
    this.commentService.addComment(comment).subscribe(newComment => {
      this.commentService.comments.update(comments => [
        ...comments,
        newComment
      ]);
    });
  }
  get user() {
    return this.userService.getUserById(this.review().userId);
  }
}
