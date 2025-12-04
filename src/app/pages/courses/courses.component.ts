import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html'
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];
  selected: any = { id: null, title: '', teacher: '', status: 'Activo' };
  isEdit = false;
  error = '';

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.coursesService.list().subscribe((res: any[]) => this.courses = res);
  }

  newCourse(): void {
    this.isEdit = false;
    this.selected = { id: null, title: '', teacher: '', status: 'Activo' };
  }

  editCourse(c: any): void {
    this.isEdit = true;
    this.selected = { ...c };
  }

  save(): void {
    this.error = '';
    if (!this.selected.title || !this.selected.teacher) {
      this.error = 'Título y profesor son obligatorios';
      return;
    }
    if (this.isEdit) {
      this.coursesService.update(this.selected.id, this.selected).subscribe(() => this.load());
    } else {
      this.coursesService.create(this.selected).subscribe(() => this.load());
    }
    this.newCourse();
  }

  delete(c: any): void {
    if (confirm('¿Eliminar curso?')) {
      this.coursesService.delete(c.id).subscribe(() => this.load());
    }
  }
}
