import { Injectable, signal } from '@angular/core';
import { Review } from '../models/review';
import { Comment } from '../models/comment';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  reviews = signal<Review[]>([
    {
      id: 1,
      workId: 1,
      reviewAuthor: 'Jan',
      createdAt: '2026-09-10T10:00:00Z',
      content: 'Najlepszy horror ever, choć wkurzający',
      comments: []
    },
    {
      id: 2,
      workId: 2,
      reviewAuthor: 'Krzysztof',
      otherMedia: `Instagram`,
      createdAt: '2026-09-11T10:00:00Z',
      content: 'Okropna, ale wciągająca bez reszty',
      comments: []
    },
    {
      id: 3,
      workId: 1,
      reviewAuthor: 'Jan3223',
      createdAt: '2026-09-14T10:00:00Z',
      content: 'Świetna gra, ale strasznie toporna',
      comments: []
    },
    {
      id: 4,
      workId: 3,
      reviewAuthor: 'SzymciuXpompa',
      createdAt: '2026-09-14T12:00:00Z',
      content: 'Świetna gra, ale strasznie toporna',
      comments: []
    },
  ]);
  addReview(review: Review) {
    this.reviews.update(reviews => [...reviews, review]);
  }
  addComment(reviewId: number, comment: Comment) {
    this.reviews.update(reviews =>
      reviews.map(review =>
        review.id === reviewId
          ? {
            ...review,
            comments: [...review.comments, comment]
          }
          : review
      )
    );
  }
}
