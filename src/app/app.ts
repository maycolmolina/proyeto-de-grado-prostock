import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuNavegacion } from './menu-navegacion/menu-navegacion';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuNavegacion],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App  {
  protected readonly title = signal('lexnova');
}
