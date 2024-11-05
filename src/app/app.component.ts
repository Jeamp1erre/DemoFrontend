import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidenavComponent } from "./dashbadmin/sidenav/sidenav.component";
import { BodyComponent } from "./dashbadmin/body/body.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, BodyComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';

 

}
