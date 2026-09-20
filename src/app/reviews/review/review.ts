import { Component, input } from '@angular/core';
import { Review } from '../../models/review';
import { CommentComponent } from '../../comments/comment/comment'
import { CommentFormComponent } from '../../comments/commentForm/commentForm'
import { Comment } from '../../models/comment';
import { ReviewService } from '../../services/reviewService'
import { WorkService } from '../../services/workService';

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
    private reviewService: ReviewService,
    private workService: WorkService
  ) { }
  get work() {
    return this.workService.works().find(
      work => work.id === this.review().workId
    );
  }
  addComment(comment: Comment) {
    this.reviewService.addComment(this.review().id, comment);
  }
}
