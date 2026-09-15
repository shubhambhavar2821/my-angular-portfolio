import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.scss'
})
export class CertificationsComponent {
  certifications = [
    {
      title: 'Workshop on RDBMS Concepts',
      issuer: 'MIT ADT Pune University',
      category: 'Database & SQL Engineering',
      icon: 'bi-database-check',
      accentColor: '#00f0ff',
      description: 'Comprehensive technical workshop focusing on relational database management systems, relational schema design, query optimization, normalization, and ACID transaction principles.'
    },
    {
      title: 'Full Stack Web Development',
      issuer: 'Spark IT Institute',
      category: 'Full Stack Web Engineering',
      icon: 'bi-patch-check-fill',
      accentColor: '#a855f7',
      description: 'Intensive hands-on professional course covering full-stack web architecture with HTML5, CSS3, JavaScript, TypeScript, Angular, Node.js, Express, MongoDB, and Git version control.'
    },
    {
      title: 'Android Application Development',
      issuer: 'Spark Institute',
      category: 'Mobile Application Development',
      icon: 'bi-android2',
      accentColor: '#10b981',
      description: 'Practical training in native Android engineering utilizing Java, Android Studio, XML UI layout design, SQLite local database, Firebase integration, and RESTful APIs.'
    }
  ];
}
