import { Component, input, output } from '@angular/core';
import { WorkService } from '../../services/workService';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-work-list',
  imports: [FormsModule],
  templateUrl: './workList.html',
  styleUrl: './workList.scss'
})
export class WorkListComponent {
  category = input<string>();
  workSelected = output<number>();

  searchTerm = '';
  sortOption = 'titleAsc';

  constructor(private workService: WorkService) { }

  get works() {
    const search = this.searchTerm.trim().toLowerCase();

    const works = this.workService.works()
      .filter(work => work.category === this.category())
      .filter(work =>
        work.title.toLowerCase().includes(search)
      );

    if (this.sortOption === 'titleAsc') {
      works.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (this.sortOption === 'titleDesc') {
      works.sort((a, b) => b.title.localeCompare(a.title));
    }

    return works;
  }

  selectWork(workId: number) {
    this.workSelected.emit(workId);
  }
}
