import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent {
  educationList = [
    {
      degree: 'MCA – Data Science',
      institution: 'MIT ADT Pune University',
      location: 'Pune, Maharashtra',
      year: '2026',
      status: 'Pursuing (Final Stage)',
      badge: 'Post Graduation',
      icon: 'bi-mortarboard-fill',
      accentColor: '#00f0ff',
      highlights: [
        'Advanced focus on Data Science, Big Data Engineering, and Scalable Web Technologies.',
        'Hands-on project development applying full stack architectures and data analysis.'
      ]
    },
    {
      degree: 'Bachelor of Science (BSc)',
      institution: 'Dr. Babasaheb Ambedkar Marathwada University',
      location: 'Maharashtra',
      year: '2024',
      score: '69.60%',
      status: 'Graduated',
      badge: 'Undergraduate Degree',
      icon: 'bi-award-fill',
      accentColor: '#a855f7',
      highlights: [
        'Completed in 2024 with 69.60% score.',
        'Rigorous foundation in computer applications, analytical reasoning, and core algorithms.'
      ]
    },
    {
      degree: 'Higher Secondary Certificate (Science)',
      institution: 'K.T.H.M College',
      location: 'Nashik, Maharashtra',
      year: '2019',
      status: 'Completed',
      badge: 'Junior College',
      icon: 'bi-book-half',
      accentColor: '#10b981',
      highlights: [
        'Physics, Chemistry, Mathematics (PCM) specialization.',
        'Strong scientific grounding and quantitative aptitude.'
      ]
    }
  ];
}
