import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isSidebarMinimized = false;
  title = 'budgetApp';

  toggleSidebar(): void {
    this.isSidebarMinimized = !this.isSidebarMinimized;
  }
}
