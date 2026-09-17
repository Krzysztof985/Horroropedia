import { Component, input, output } from '@angular/core';
import { ReviewService } from '../../services/reviewService';

@Component({
  selector: 'app-reviewer-list',
  templateUrl: './reviewerList.html',
  styleUrl: './reviewerList.scss'
})
export class ReviewerListComponent {

  category = input<string>();
  title = input<string>();
  reviewerSelected = output<string>();

  constructor(private reviewService: ReviewService) { }

  get reviewers() {
    return [...new Set(
      this.reviewService.reviews
        .filter(
          review =>
            review.category === this.category() &&
            review.title === this.title()
        )
        .map(review => review.reviewAuthor)
    )];
  }
  selectReviewer(reviewer: string) {
    this.reviewerSelected.emit(reviewer);
  }
}
