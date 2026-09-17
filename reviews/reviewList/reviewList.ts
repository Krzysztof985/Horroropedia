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

  category = input<string>();
  title = input<string>();
  reviewAuthor = input<string>();

  constructor(private reviewService: ReviewService) { }

  get filteredReviews() {
    return this.reviewService.reviews.filter(
      review =>
        review.category === this.category() &&
        review.title === this.title() &&
        review.reviewAuthor === this.reviewAuthor()
    );
  }
}
