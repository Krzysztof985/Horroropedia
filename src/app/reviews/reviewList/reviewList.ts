import { Component, input } from '@angular/core';
import { ReviewComponent } from '../review/review';
import { ReviewService } from '../../services/reviewService';

@Component({
  selector: 'app-review-list',
  imports: [ReviewComponent],
  templateUrl: './reviewList.html',
  styleUrl: './reviewList.scss'
})
export class ReviewListComponent {

  workId = input<number | null>();
  userId = input<number>();
  constructor(private reviewService: ReviewService) { }

  get filteredReviews() {
    return this.reviewService.reviews().filter(
      review =>
        review.workId === this.workId() &&
        review.userId === this.userId()
    );
  }
}
