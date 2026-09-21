import { Component, input, output } from '@angular/core';
import { ReviewService } from '../../services/reviewService';

@Component({
  selector: 'app-reviewer-list',
  templateUrl: './reviewerList.html',
  styleUrl: './reviewerList.scss'
})
export class ReviewerListComponent {

  workId = input<number | null>();
  reviewerSelected = output<string>();

  constructor(private reviewService: ReviewService) {
    this.reviewService.loadReviews();
  }

  get reviewers() {
    return [...new Set(
      this.reviewService.reviews()
        .filter(review => review.workId === this.workId())
        .map(review => review.reviewAuthor)
    )];
  }
  selectReviewer(reviewer: string) {
    this.reviewerSelected.emit(reviewer);
  }
}
