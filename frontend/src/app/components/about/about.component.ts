import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StatCard {
  title: string;
  subtitle: string;
  icon: string;
  gradient: string;
  tags: string[];
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  stats: StatCard[] = [
    {
      title: 'Full Stack Development',
      subtitle: 'End-to-End Web Solutions',
      icon: 'bi-layers-fill',
      gradient: 'from-cyan',
      tags: ['Angular', 'Node.js', 'Express.js', 'MongoDB']
    },
    {
      title: 'Frontend Engineering',
      subtitle: 'Modern & Interactive UI/UX',
      icon: 'bi-window-desktop',
      gradient: 'from-purple',
      tags: ['HTML5/CSS3', 'TypeScript', 'Bootstrap', '3D UI']
    },
    {
      title: 'Data Science & Analytics',
      subtitle: 'Data-Driven Insights',
      icon: 'bi-diagram-3-fill',
      gradient: 'from-emerald',
      tags: ['MCA Graduate', 'RDBMS', 'SQL', 'Algorithms']
    },
    {
      title: 'Problem Solving',
      subtitle: 'Clean & Scalable Code',
      icon: 'bi-puzzle-fill',
      gradient: 'from-pink',
      tags: ['Java', 'C++', 'Git / GitHub', 'REST APIs']
    }
  ];

  highlights = [
    { label: 'Location', value: 'Pune, Maharashtra, India', icon: 'bi-geo-alt-fill' },
    { label: 'Current Degree', value: 'MCA – Data Science (2026)', icon: 'bi-mortarboard-fill' },
    { label: 'Industry Experience', value: 'Suguna Foods Pvt (Frontend Dev)', icon: 'bi-briefcase-fill' },
    { label: 'Availability', value: 'Open to Full-Time Roles', icon: 'bi-check-circle-fill' }
  ];
}
