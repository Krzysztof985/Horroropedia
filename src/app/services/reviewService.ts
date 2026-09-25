import { Injectable, signal } from '@angular/core';
import { Review } from '../models/review';
import { Comment } from '../models/comment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  reviews = signal<Review[]>([]);
  constructor(private http: HttpClient) { }

  loadReviews() {
    this.http.get<Review[]>('http://localhost:3000/api/reviews')
      .subscribe(reviews => {
        console.log('Recenzje pobrane z backendu:', reviews);
        this.reviews.set(reviews);
      });
  }
  addReview(review: Review) {
    return this.http.post<Review>(
      'http://localhost:3000/api/reviews',
      review
    );
  }

}
