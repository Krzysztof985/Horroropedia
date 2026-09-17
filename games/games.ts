import { Component } from '@angular/core';
import { ReviewListComponent } from '../reviews/reviewList/reviewList';
import { WorkListComponent } from '../reviews/workList/workList';
import { ReviewerListComponent } from '../reviews/reviewerList/reviewerList';

@Component({
  selector: 'app-games',
  imports: [ReviewListComponent, WorkListComponent, ReviewerListComponent],
  templateUrl: './games.html',
  styleUrl: './games.scss'
})
export class Games {
  selectedWork = ``;
  selectedReviewer = '';
}
