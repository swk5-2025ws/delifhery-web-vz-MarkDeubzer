import {Component, HostListener, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [NgOptimizedImage,RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  isLoggedIn = false;
  username: string | null = null;
  menuOpen = false;

  constructor(private keycloak: KeycloakService, private router: Router) {
  }

  async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      const profile = await this.keycloak.loadUserProfile();
      this.username = profile.username || profile.firstName || null;
    }
  }

  toggleMenu(e: MouseEvent) {
    e.stopPropagation();
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('document:click', ['$event'])
  closeMenu(e: MouseEvent) {
    const target = e.target as HTMLElement | null;
    if (target?.closest('.nav_menu')) return;
    this.menuOpen = false;
  }

  login() {
    this.keycloak.login();
  }

  register() {
    this.keycloak.register();
  }

  logout() {
    this.keycloak.logout(window.location.origin + '/home');
  }

  getUsername(){
    return this.username;
  }
}
