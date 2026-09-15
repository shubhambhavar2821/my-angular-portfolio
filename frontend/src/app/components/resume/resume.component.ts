import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent {
  isDownloading = false;
  downloadSuccess = false;

  downloadResume(): void {
    this.isDownloading = true;
    const resumePath = 'assets/resume/Shubham_Bhavar_Resume.pdf';

    setTimeout(() => {
      const link = document.createElement('a');
      link.href = resumePath;
      link.setAttribute('download', 'Shubham_Bhavar_Resume.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      this.isDownloading = false;
      this.downloadSuccess = true;
      setTimeout(() => {
        this.downloadSuccess = false;
      }, 4000);
    }, 500);
  }
}
