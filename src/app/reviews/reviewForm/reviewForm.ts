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

  createReview(workId: number) {
    const review: Review = {
      id: 999,
      workId: workId,
      otherMedia: this.reviewForm.value.otherMedia ?? '',
      userId: this.userService.currentUser.id,
      createdAt: new Date().toISOString(),
      content: this.reviewForm.value.content ?? ''
    };

    console.log('Utworzona recenzja:', review);

    this.reviewService.addReview(review).subscribe(newReview => {
      console.log('Recenzja zwrócona przez backend:', newReview);

      this.reviewService.reviews.update(reviews => [
        ...reviews,
        newReview
      ]);
    });
  }

  addReview() {
    const existingWork = this.workService.works().find(
      work =>
        work.title === this.reviewForm.value.title &&
        work.category === this.category()
    );

    if (existingWork) {
      this.createReview(existingWork.id);
      return;
    }

    const work: Work = {
      id: 999,
      title: this.reviewForm.value.title ?? '',
      author: this.reviewForm.value.author ?? '',
      producer: this.reviewForm.value.producer ?? '',
      releaseDate: this.reviewForm.value.dateOfPublication ?? '',
      category: this.category() ?? ''
    };

    this.workService.addWork(work).subscribe(newWork => {
      console.log('Work zwrócony przez backend:', newWork);

      this.workService.works.update(works => [...works, newWork]);

      this.createReview(newWork.id);
    });
  }
}
