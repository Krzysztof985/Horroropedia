import { Injectable } from '@angular/core';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  reviews: Review[] = [
    {
      id: 1,
      reviewAuthor: 'Jan',
      Author: 'Project Siren',
      dateOfPublication: '06.11.2003',
      title: 'Forbidden Siren/Siren',
      content: 'Najlepszy horror ever, choć wkurzający',
      category: 'games',
      comments: []
    },
    {
      id: 2,
      reviewAuthor: 'Krzysztof',
      Author: 'Jack Ketchum',
      dateOfPublication: '1989',
      title: 'Dziewczyna z sąsiedztwa',
      content: 'Okropna, ale wciągająca bez reszty',
      category: 'books',
      comments: []
    },
    {
      id: 3,
      reviewAuthor: 'Jan3223',
      Author: 'Project Siren',
      dateOfPublication: '06.11.2003',
      title: 'Forbidden Siren/Siren',
      content: 'Świetna gra, ale strasznie toporna',
      category: 'games',
      comments: []
    },
    {
      id: 4,
      reviewAuthor: 'SzymciuXpompa',
      Author: 'Team Silent',
      dateOfPublication: '23.05.2003',
      title: 'Silent Hill 3',
      content: 'Świetna gra, ale strasznie toporna',
      category: 'games',
      comments: []
    },
  ];

}
