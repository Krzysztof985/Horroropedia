import { Component, Input } from '@angular/core';
import { Review } from '../../models/review';

@Component({
  selector: 'app-review',
  imports: [],
  templateUrl: './review.html',
  styleUrl: './review.scss'
})
export class ReviewComponent {
  @Input() review!: Review;
}
