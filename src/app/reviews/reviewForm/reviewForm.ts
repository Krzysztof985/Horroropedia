import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReviewService } from '../../services/reviewService';
import { UserService } from '../../services/userService';
import { Review } from '../../models/review';

@Component({
  selector: 'app-review-form',
  imports: [ReactiveFormsModule],
  templateUrl: './reviewForm.html',
  styleUrl: './reviewForm.scss'
})
export class ReviewFormComponent {

  category = input<string>();

  reviewForm = new FormGroup({
    otherMedia: new FormControl(''),
    author: new FormControl(''),
    producer: new FormControl(''),
    title: new FormControl(''),
    dateOfPublication: new FormControl(''),
    content: new FormControl('')
  });

  constructor(
    private reviewService: ReviewService,
    private userService: UserService
  ) { }

  addReview() {
    const nextId =
      this.reviewService.reviews().length > 0
        ? Math.max(...this.reviewService.reviews().map(review => review.id)) + 1
        : 1;
    const review: Review = {
      id: nextId,
      otherMedia: this.reviewForm.value.otherMedia ?? '',
      reviewAuthor: this.userService.currentUser.nickname,
      author: this.reviewForm.value.author ?? '',
      producer: this.reviewForm.value.producer ?? '',
      dateOfPublication: this.reviewForm.value.dateOfPublication ?? '',
      title: this.reviewForm.value.title ?? '',
      content: this.reviewForm.value.content ?? '',
      category: this.category() ?? '',
      comments: []
    };

    this.reviewService.addReview(review);
  }
}
