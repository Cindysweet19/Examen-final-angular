import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UsersService } from '../../services/users.service';
import { CoursesService } from '../../services/courses.service';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  totalUsers = 0;
  totalCourses = 0;
  totalProfesores = 0;
  totalEstudiantes = 0;

  role: string = '';                // ✅ FALTABA
  alertMessage: string | null = null;

  private alertSub!: Subscription;

  constructor(
    private usersService: UsersService,
    private coursesService: CoursesService,
    private auth: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
  // 🔥 LIMPIAR ALERTAS VIEJAS
  this.alertService.clear();

  this.role = this.auth.getRole() || 'sin rol';

  this.alertSub = this.alertService.message$.subscribe(message => {
    this.alertMessage = message;
  });

    // Rol desde JWT
    this.role = this.auth.getRole() || 'sin rol';

    // Escuchar alertas
    this.alertSub = this.alertService.message$.subscribe(message => {
      this.alertMessage = message;
    });

    // Usuarios
    this.usersService.list().subscribe((users: any[]) => {
      this.totalUsers = users.length;
      this.totalProfesores = users.filter(u => u.role === 'profesor').length;
      this.totalEstudiantes = users.filter(u => u.role === 'estudiante').length;
    });

    // Cursos
    this.coursesService.list().subscribe((courses: any[]) => {
      this.totalCourses = courses.length;
    });
  }

  closeAlert(): void {
    this.alertService.clear();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

  ngOnDestroy(): void {
    this.alertSub?.unsubscribe();
  }
}
