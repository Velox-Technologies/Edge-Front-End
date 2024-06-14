import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { DrawerComponent } from '../../common/drawer/drawer.component';

@Component({
  selector: 'DashboardLayout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent implements AfterViewInit {
  user: any = null;
  currentSectionTitle: string = '';

  @ViewChild(DrawerComponent) drawer!: DrawerComponent;

  constructor(
    private AuthService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.AuthService.returnUser().subscribe((user) => {
      this.user = user;
    });
    // Subscribe to router events to update currentSectionTitle
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateSectionTitle();
      });

    // Initial call to set section title based on current route
    this.updateSectionTitle();
  }

  updateSectionTitle() {
    // Get the current route data or url segment to set the title
    const currentRoute = this.router.routerState.snapshot.url;
    console.log({ currentRoute });

    // Check if the current route is /dashboard and set the title accordingly
    if (currentRoute === '/dashboard') {
      this.currentSectionTitle = 'Analytics';
    } else {
      // Capitalize the first letter of the last segment of the route
      const title = currentRoute
        ?.split('/')
        ?.pop()
        ?.replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
      this.currentSectionTitle = title || 'Dashboard'; // Replace 'Default Title' with your default text if needed
    }
  }

  ngAfterViewInit() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileSidebar = document.getElementById('mobileSidebar');

    sidebarToggle?.addEventListener('click', () => {
      if (mobileSidebar?.classList.contains('-translate-x-full')) {
        mobileSidebar.classList.remove('-translate-x-full');
        mobileSidebar.classList.add('translate-x-0');
      } else {
        mobileSidebar?.classList.remove('translate-x-0');
        mobileSidebar?.classList.add('-translate-x-full');
      }
    });
  }

  signOut() {
    this.AuthService.signOut();
  }

  openDrawer() {
    this.drawer.openDrawer();
  }
}
