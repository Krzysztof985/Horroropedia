import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReviewService } from '../../services/reviewService';
import { UserService } from '../../services/userService';
import { Review } from '../../models/review';
import { WorkService } from '../../services/workService'
import { Work } from '../../models/work'

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
    private userService: UserService,
    private workService: WorkService
  ) { }

  addReview() {
    const existingWork = this.workService.works().find(
      work =>
        work.title === this.reviewForm.value.title &&
        work.category === this.category()
    );

    let workId: number;

    if (existingWork) {
      workId = existingWork.id;
    } else {
      const nextWorkId =
        this.workService.works().length > 0
          ? Math.max(...this.workService.works().map(work => work.id)) + 1
          : 1;

      const work: Work = {
        id: nextWorkId,
        title: this.reviewForm.value.title ?? '',
        author: this.reviewForm.value.author ?? '',
        producer: this.reviewForm.value.producer ?? '',
        releaseDate: this.reviewForm.value.dateOfPublication ?? '',
        category: this.category() ?? ''
      };

      this.workService.addWork(work);

      workId = work.id;
    }

    //console.log(this.workService.works());
    const nextId =
      this.reviewService.reviews().length > 0
        ? Math.max(...this.reviewService.reviews().map(review => review.id)) + 1
        : 1;
    const review: Review = {
      id: nextId,
      workId: workId,
      otherMedia: this.reviewForm.value.otherMedia ?? '',
      reviewAuthor: this.userService.currentUser.nickname,
      createdAt: new Date().toISOString(),
      content: this.reviewForm.value.content ?? '',
      comments: []
    };
    console.log('Utworzona recenzja:', review);
    this.reviewService.addReview(review);
  }
}
