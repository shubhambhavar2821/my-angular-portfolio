import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = 2026;

  quickLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' }
  ];

  socialLinks = [
    { label: 'GitHub', icon: 'bi-github', href: 'https://github.com/shubhambhavar2821', color: '#00f0ff' },
    { label: 'LinkedIn', icon: 'bi-linkedin', href: 'https://www.linkedin.com/in/shubham-bhavar-a3506025b/', color: '#0a66c2' },
    { label: 'Email', icon: 'bi-envelope-fill', href: 'mailto:shubhambhavar2821@gmail.com', color: '#ea4335' },
    { label: 'WhatsApp', icon: 'bi-whatsapp', href: 'https://wa.me/919890982446?text=Hello%20Shubham%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you.', color: '#25d366' }
  ];

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
