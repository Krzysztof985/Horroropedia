import { Component, input, output } from '@angular/core';
import { ReviewService } from '../../services/reviewService';

@Component({
  selector: 'app-work-list',
  templateUrl: './workList.html',
  styleUrl: './workList.scss'
})
export class WorkListComponent {

  category = input<string>();
  workSelected = output<string>();

  constructor(private reviewService: ReviewService) { }

  get works() {
    return [...new Set(
      this.reviewService.reviews
        .filter(review => review.category === this.category())
        .map(review => review.title)
    )];
  }
  selectWork(work: string) {
    this.workSelected.emit(work);
  }
}
