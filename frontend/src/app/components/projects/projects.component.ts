import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  technologies: string[];
  githubUrl: string;
  demoUrl: string;
  icon: string;
  accentGradient: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  selectedProject: Project | null = null;

  projects: Project[] = [
    {
      id: 'online-food-store',
      title: 'Online Food Store Platform',
      category: 'Full Stack Web Application',
      description: 'A digital e-commerce platform designed for seamless browsing, cart management, and sale and delivery of food products to customers via the internet.',
      features: [
        'Interactive food catalog with dynamic category filtering and instant search.',
        'Real-time shopping cart state management using Angular services and observables.',
        'Secure RESTful backend API built with Node.js & Express.js for order processing.',
        'MongoDB database modeling for items, categories, customer orders, and transaction history.'
      ],
      technologies: ['Angular', 'Node.js', 'Express.js', 'MongoDB', 'TypeScript', 'Bootstrap'],
      githubUrl: 'https://github.com/shubhambhavar2821',
      demoUrl: 'https://github.com/shubhambhavar2821',
      icon: 'bi-bag-check-fill',
      accentGradient: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)'
    },
    {
      id: 'fitness-club',
      title: 'Fitness Club Website',
      category: 'Frontend Web Application',
      description: 'A high-conversion frontend web application designed to promote a fitness club and provide comprehensive information about services, facilities, trainer profiles, and workout schedules.',
      features: [
        'Dynamic and modern responsive UI designed with Bootstrap and custom CSS animations.',
        'Interactive membership tier pricing tables and workout class schedule viewer.',
        'Trainer profile showcase with modal details and client testimonials carousel.',
        'Interactive inquiry contact form with client-side JavaScript validation.'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Responsive UI'],
      githubUrl: 'https://github.com/shubhambhavar2821',
      demoUrl: 'https://github.com/shubhambhavar2821',
      icon: 'bi-activity',
      accentGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(0, 240, 255, 0.2) 100%)'
    }
  ];

  openProjectDetails(project: Project): void {
    this.selectedProject = project;
  }

  closeProjectDetails(): void {
    this.selectedProject = null;
  }
}
