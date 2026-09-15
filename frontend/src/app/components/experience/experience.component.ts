import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  experiences = [
    {
      role: 'Frontend Developer',
      company: 'Suguna Foods Pvt',
      location: 'Nashik, Maharashtra, India',
      duration: 'April 2022 – October 2023',
      periodType: '1 Year 7 Months',
      description: 'Worked as a key frontend engineer responsible for architecting and developing responsive web applications, modern UI components, and integrating with backend web services.',
      achievements: [
        'Designed and implemented modular, reusable UI components ensuring responsive performance across desktop, tablet, and mobile devices.',
        'Collaborated with backend engineers to integrate RESTful API endpoints and optimize asynchronous data rendering.',
        'Improved frontend page load speeds and enhanced cross-browser rendering consistency.',
        'Participated in agile sprints, daily standups, code reviews, and defect triage.'
      ],
      technologies: ['HTML5', 'CSS3 / SCSS', 'JavaScript (ES6+)', 'Bootstrap', 'jQuery', 'REST APIs', 'Git']
    }
  ];
}
