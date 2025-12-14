import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private alert: AlertService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const allowedRoles = route.data['roles'] as string[];
    const userRole = this.auth.getRole();

    // Admin entra a todo
    if (userRole === 'admin') {
      return true;
    }

    // Rol permitido
    if (allowedRoles && allowedRoles.includes(userRole!)) {
      return true;
    }

    // ❌ No autorizado → mostrar alerta y redirigir
    this.alert.show('No tiene permisos para acceder a esta sección.');

    // 🔥 CLAVE: diferir la navegación
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 0);

    return false;
  }
}
