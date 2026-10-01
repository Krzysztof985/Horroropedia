import { Component, effect, input, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
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

  errorMessage = signal('');

  category = input<string>();
  workId = input<number | null>(null);

  reviewForm = new FormGroup({
    otherMedia: new FormControl(''),
    author: new FormControl(''),
    producer: new FormControl(''),
    title: new FormControl(''),
    dateOfPublication: new FormControl(''),
    content: new FormControl('', Validators.required)
  });

  constructor(
    private reviewService: ReviewService,
    private userService: UserService,
    private workService: WorkService
  ) {
    effect(() => {
      const id = this.workId();

      if (id === null) {
        this.reviewForm.controls.title.enable();
        this.reviewForm.controls.author.enable();
        this.reviewForm.controls.producer.enable();
        this.reviewForm.controls.dateOfPublication.enable();

        return;
      }

      const work = this.workService.works().find(
        work => work.id === id
      );

      if (!work) {
        return;
      }

      this.reviewForm.patchValue({
        title: work.title,
        author: work.author,
        producer: work.producer ?? '',
        dateOfPublication: work.releaseDate
      });

      this.reviewForm.controls.title.disable();
      this.reviewForm.controls.author.disable();
      this.reviewForm.controls.producer.disable();
      this.reviewForm.controls.dateOfPublication.disable();
    });
  }

  createReview(workId: number) {

    const review: Review = {
      id: 999,
      workId: workId,
      otherMedia: this.reviewForm.value.otherMedia ?? '',
      userId: this.userService.currentUser()!.id,
      createdAt: new Date().toISOString(),
      content: this.reviewForm.value.content ?? ''
    };

    this.reviewService.addReview(review).subscribe(newReview => {
      this.reviewService.reviews.update(reviews => [
        ...reviews,
        newReview
      ]);
    });
  }

  addReview() {
    if (!this.userService.currentUser()) {
      this.errorMessage.set(
        'Aby dodać recenzję, musisz być zalogowany.'
      );
      return;
    }

    if (this.workId() === null) {
      this.reviewForm.controls.title.setValidators(Validators.required);
      this.reviewForm.controls.author.setValidators(Validators.required);
      this.reviewForm.controls.dateOfPublication.setValidators(Validators.required);
    } else {
      this.reviewForm.controls.title.clearValidators();
      this.reviewForm.controls.author.clearValidators();
      this.reviewForm.controls.dateOfPublication.clearValidators();
    }

    this.reviewForm.controls.title.updateValueAndValidity();
    this.reviewForm.controls.author.updateValueAndValidity();
    this.reviewForm.controls.dateOfPublication.updateValueAndValidity();

    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    if (this.workId() !== null) {
      this.createReview(this.workId()!);
      return;
    }

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

      this.workService.works.update(works => [...works, newWork]);

      this.createReview(newWork.id);
    });
  }
}
