import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactService, ContactFormData } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactForm: FormGroup;
  isLoading = false;
  isSuccess = false;
  needsActivation = false;
  successDetails = '';
  errorMessage = '';
  fallbackMailtoUrl = '';
  fallbackWhatsappUrl = '';
  submitted = false;

  contactInfo = [
    {
      title: 'Email Address',
      value: 'shubhambhavar2821@gmail.com',
      icon: 'bi-envelope-at-fill',
      link: 'mailto:shubhambhavar2821@gmail.com',
      actionText: 'Send Email',
      color: '#00f0ff'
    },
    {
      title: 'WhatsApp Direct',
      value: '+91 9890982446',
      icon: 'bi-whatsapp',
      link: 'https://wa.me/919890982446?text=Hello%20Shubham%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you.',
      actionText: 'Open Chat',
      color: '#25d366'
    },
    {
      title: 'Location',
      value: 'Pune, Maharashtra, India',
      icon: 'bi-geo-alt-fill',
      link: 'https://maps.google.com/?q=Pune,Maharashtra,India',
      actionText: 'View on Map',
      color: '#a855f7'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
      message: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3000)]]
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.fallbackMailtoUrl = '';
    this.needsActivation = false;

    if (this.contactForm.invalid) {
      return;
    }

    this.isLoading = true;
    const formData: ContactFormData = this.contactForm.value;

    this.contactService.sendMessage(formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.isSuccess = true;
        this.needsActivation = !!response.needsActivation;
        this.successDetails = response.message;
        this.contactForm.reset();
        this.submitted = false;

        // Auto hide success notice after 15 seconds
        setTimeout(() => {
          this.isSuccess = false;
          this.needsActivation = false;
        }, 15000);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.message || 'Unable to send message automatically.';
        if (err.mailtoUrl) this.fallbackMailtoUrl = err.mailtoUrl;
        if (err.whatsappUrl) this.fallbackWhatsappUrl = err.whatsappUrl;
      }
    });
  }

  openDirectGmail(): void {
    const rawValues = this.contactForm.value;
    const sub = encodeURIComponent(rawValues.subject || 'Portfolio Inquiry');
    const body = encodeURIComponent(`Hi Shubham,\n\n${rawValues.message || ''}\n\nFrom: ${rawValues.name || ''}\nEmail: ${rawValues.email || ''}`);
    window.open(`mailto:shubhambhavar2821@gmail.com?subject=${sub}&body=${body}`, '_blank');
  }
}
