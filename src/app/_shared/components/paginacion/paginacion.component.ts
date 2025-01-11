import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-paginacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})
export class PaginacionComponent {
  @Input() currentPage: number = 1;

  @Input() totalPages: number = 1;

  @Output() pageChanged: EventEmitter<number> = new EventEmitter();


  onPageChange(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChanged.emit(this.currentPage);
    }
  }

}
