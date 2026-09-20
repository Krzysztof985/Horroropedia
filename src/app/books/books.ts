import { Component } from '@angular/core';
import { ReviewListComponent } from '../reviews/reviewList/reviewList';
import { WorkListComponent } from '../reviews/workList/workList';
import { ReviewerListComponent } from '../reviews/reviewerList/reviewerList';
import { ReviewFormComponent } from '../reviews/reviewForm/reviewForm'

@Component({
  selector: 'app-books',
  imports: [ReviewListComponent, WorkListComponent, ReviewerListComponent, ReviewFormComponent],
  templateUrl: './books.html',
  styleUrl: './books.scss'
})
export class Books {
  selectedWork = ``;
  selectedReviewer = '';
  showForm = false;
}
