import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  // Simplificado: en esta versión permite el acceso (podrías validar roles desde el token)
  canActivate(): boolean {
    return true;
  }
}
