import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Work } from '../models/work';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  works = signal<Work[]>([]);

  constructor(private http: HttpClient) { }

  loadWorks() {
    this.http.get<Work[]>('http://localhost:3000/api/works')
      .subscribe(works => {
        this.works.set(works);
      });
  }

  addWork(work: Work) {
    return this.http.post<Work>('http://localhost:3000/api/works', work);
  }

}
