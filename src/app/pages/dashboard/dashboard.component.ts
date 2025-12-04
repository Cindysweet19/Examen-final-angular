import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { CoursesService } from '../../services/courses.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  totalUsers = 0;
  totalCourses = 0;
  totalProfesores = 0;
  totalEstudiantes = 0;

  constructor(
    private usersService: UsersService,
    private coursesService: CoursesService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usersService.list().subscribe((users: any[]) => {
      this.totalUsers = users.length;
      this.totalProfesores = users.filter(u => u.role === 'profesor').length;
      this.totalEstudiantes = users.filter(u => u.role === 'estudiante').length;
    });
    this.coursesService.list().subscribe((courses: any[]) => {
      this.totalCourses = courses.length;
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
