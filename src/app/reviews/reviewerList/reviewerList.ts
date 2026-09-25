import { Component, input, output } from '@angular/core';
import { ReviewService } from '../../services/reviewService';
import { UserService } from '../../services/userService';

@Component({
  selector: 'app-reviewer-list',
  templateUrl: './reviewerList.html',
  styleUrl: './reviewerList.scss'
})
export class ReviewerListComponent {

  workId = input<number | null>();
  reviewerSelected = output<number>();

  constructor(
    private reviewService: ReviewService,
    private userService: UserService
  ) {
    this.reviewService.loadReviews();
  }

  get reviewers() {
    const userIds = [...new Set(
      this.reviewService.reviews()
        .filter(review => review.workId === this.workId())
        .map(review => review.userId)
    )];

    return userIds
      .map(userId => this.userService.getUserById(userId))
      .filter(user => user !== undefined);
  }

  selectReviewer(userId: number) {
    this.reviewerSelected.emit(userId);
  }
}
