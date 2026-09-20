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
      reviewAuthor: 'Jan',
      author: 'Project Siren',
      dateOfPublication: '06.11.2003',
      title: 'Forbidden Siren/Siren',
      content: 'Najlepszy horror ever, choć wkurzający',
      category: 'games',
      comments: []
    },
    {
      id: 2,
      reviewAuthor: 'Krzysztof',
      otherMedia: `Instagram`,
      author: 'Jack Ketchum',
      dateOfPublication: '1989',
      title: 'Dziewczyna z sąsiedztwa',
      content: 'Okropna, ale wciągająca bez reszty',
      category: 'books',
      comments: []
    },
    {
      id: 3,
      reviewAuthor: 'Jan3223',
      author: 'Project Siren',
      dateOfPublication: '06.11.2003',
      title: 'Forbidden Siren/Siren',
      content: 'Świetna gra, ale strasznie toporna',
      category: 'games',
      comments: []
    },
    {
      id: 4,
      reviewAuthor: 'SzymciuXpompa',
      author: 'Team Silent',
      dateOfPublication: '23.05.2003',
      title: 'Silent Hill 3',
      content: 'Świetna gra, ale strasznie toporna',
      category: 'games',
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
