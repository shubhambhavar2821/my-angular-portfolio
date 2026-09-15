import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SkillItem {
  name: string;
  category: 'all' | 'languages' | 'frontend' | 'backend' | 'database' | 'tools';
  level: string;
  icon: string;
  description: string;
  color: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  activeTab: 'all' | 'languages' | 'frontend' | 'backend' | 'database' | 'tools' = 'all';

  categories = [
    { id: 'all', label: 'All Skills', icon: 'bi-grid-fill' },
    { id: 'frontend', label: 'Frontend', icon: 'bi-browser-chrome' },
    { id: 'backend', label: 'Backend & DB', icon: 'bi-hdd-network-fill' },
    { id: 'languages', label: 'Languages', icon: 'bi-code-slash' },
    { id: 'tools', label: 'Tools & Practices', icon: 'bi-tools' }
  ];

  skills: SkillItem[] = [
    // Frontend Technologies
    {
      name: 'Angular',
      category: 'frontend',
      level: 'Proficient',
      icon: 'bi-filetype-tsx',
      description: 'Components, Services, Routing, Observables, Dependency Injection',
      color: '#dd0031'
    },
    {
      name: 'TypeScript',
      category: 'frontend',
      level: 'Proficient',
      icon: 'bi-filetype-tsx',
      description: 'Strict Typing, Interfaces, Generics, Modern ESNext features',
      color: '#3178c6'
    },
    {
      name: 'JavaScript (ES6+)',
      category: 'frontend',
      level: 'Advanced',
      icon: 'bi-filetype-js',
      description: 'Async/Await, DOM manipulation, Closures, Event Loop',
      color: '#f7df1e'
    },
    {
      name: 'HTML5 & CSS3',
      category: 'frontend',
      level: 'Advanced',
      icon: 'bi-filetype-html',
      description: 'Semantic HTML, Flexbox, CSS Grid, SCSS, Animations, Responsive layouts',
      color: '#e34f26'
    },
    {
      name: 'Bootstrap & UI Frameworks',
      category: 'frontend',
      level: 'Advanced',
      icon: 'bi-bootstrap-fill',
      description: 'Mobile-first grid system, customized components, responsive design',
      color: '#7952b3'
    },
    {
      name: 'jQuery',
      category: 'frontend',
      level: 'Proficient',
      icon: 'bi-code-square',
      description: 'DOM interaction, event handling, dynamic UI scripting',
      color: '#0769ad'
    },

    // Backend & Database
    {
      name: 'Node.js',
      category: 'backend',
      level: 'Proficient',
      icon: 'bi-server',
      description: 'Asynchronous event-driven runtime, NPM ecosystem, Server architecture',
      color: '#339933'
    },
    {
      name: 'Express.js',
      category: 'backend',
      level: 'Proficient',
      icon: 'bi-diagram-2-fill',
      description: 'RESTful API routing, Middleware, Request validation, Error handling',
      color: '#00f0ff'
    },
    {
      name: 'MongoDB',
      category: 'database',
      level: 'Proficient',
      icon: 'bi-database-fill',
      description: 'NoSQL schema design, Mongoose ODM, CRUD aggregation, Atlas cloud',
      color: '#47a248'
    },

    // Programming Languages
    {
      name: 'Java',
      category: 'languages',
      level: 'Proficient',
      icon: 'bi-cup-hot-fill',
      description: 'Object-Oriented Programming, Data Structures, Core Java principles',
      color: '#f89820'
    },
    {
      name: 'C++',
      category: 'languages',
      level: 'Intermediate',
      icon: 'bi-terminal-fill',
      description: 'OOP concepts, Algorithms, Memory management fundamentals',
      color: '#00599c'
    },
    {
      name: 'C',
      category: 'languages',
      level: 'Intermediate',
      icon: 'bi-file-earmark-code-fill',
      description: 'Procedural programming, Pointers, System foundations',
      color: '#a8b9cc'
    },

    // Other Tools
    {
      name: 'Git & GitHub',
      category: 'tools',
      level: 'Advanced',
      icon: 'bi-git',
      description: 'Version control, Branching workflows, PRs, Collaborative codebases',
      color: '#f05032'
    },
    {
      name: 'RESTful APIs',
      category: 'tools',
      level: 'Advanced',
      icon: 'bi-arrow-left-right',
      description: 'API design, Postman testing, JSON serialization, status codes',
      color: '#00f0ff'
    },
    {
      name: 'Responsive Web Design',
      category: 'tools',
      level: 'Advanced',
      icon: 'bi-phone-flip',
      description: 'Cross-browser compatibility, Mobile-first optimization, Accessibility',
      color: '#10b981'
    }
  ];

  get filteredSkills(): SkillItem[] {
    if (this.activeTab === 'all') return this.skills;
    if (this.activeTab === 'backend') {
      return this.skills.filter(s => s.category === 'backend' || s.category === 'database');
    }
    return this.skills.filter(s => s.category === this.activeTab);
  }

  setTab(tabId: any) {
    this.activeTab = tabId;
  }
}
