import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  selected: any = { id: null, name: '', email: '', role: 'estudiante' };
  isEdit = false;
  error = '';

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.usersService.list().subscribe((res: any[]) => this.users = res);
  }

  newUser(): void {
    this.isEdit = false;
    this.selected = { id: null, name: '', email: '', role: 'estudiante' };
  }

  editUser(u: any): void {
    this.isEdit = true;
    this.selected = { ...u };
  }

  save(): void {
    this.error = '';
    if (!this.selected.name || !this.selected.email) {
      this.error = 'Nombre y email son obligatorios';
      return;
    }
    if (this.isEdit) {
      this.usersService.update(this.selected.id, this.selected).subscribe(() => this.load());
    } else {
      this.usersService.create(this.selected).subscribe(() => this.load());
    }
    this.newUser();
  }

  delete(u: any): void {
    if (confirm('¿Eliminar usuario?')) {
      this.usersService.delete(u.id).subscribe(() => this.load());
    }
  }
}
