import { Component } from '@angular/core';
import { ReviewListComponent } from '../reviews/reviewList/reviewList';
import { WorkListComponent } from '../reviews/workList/workList';
import { ReviewerListComponent } from '../reviews/reviewerList/reviewerList';
import {ReviewFormComponent } from '../reviews/reviewForm/reviewForm'

@Component({
  selector: 'app-games',
  imports: [ReviewListComponent, WorkListComponent, ReviewerListComponent, ReviewFormComponent],
  templateUrl: './games.html',
  styleUrl: './games.scss'
})
export class Games {
  selectedWork = ``;
  selectedReviewer = '';
  showForm = false;
}
