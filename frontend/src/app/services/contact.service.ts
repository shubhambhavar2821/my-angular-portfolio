import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, timeout, of, switchMap } from 'rxjs';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
  details?: any;
  needsActivation?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private backendApiUrl = 'http://localhost:5000/api/contact';
  private formSubmitUrl = 'https://formsubmit.co/ajax/shubhambhavar2821@gmail.com';

  constructor(private http: HttpClient) {}

  /**
   * Send contact message using FormSubmit (direct to Gmail) with Node.js backend backup
   */
  sendMessage(data: ContactFormData): Observable<ContactApiResponse> {
    const payload = {
      name: data.name,
      email: data.email,
      _subject: `[Portfolio Contact] ${data.subject} - from ${data.name}`,
      _replyto: data.email,
      message: data.message,
      _template: 'table',
      _captcha: 'false'
    };

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    // 1. Send directly via FormSubmit (cloud email forwarder straight to shubhambhavar2821@gmail.com)
    return this.http.post<any>(this.formSubmitUrl, payload, { headers }).pipe(
      timeout(10000),
      switchMap((res) => {
        // Also fire background logging to local backend if running
        this.logToLocalBackend(data);

        if (res.success === 'true' || res.success === true) {
          return of({
            success: true,
            message: 'Your message has been sent successfully! Check your Gmail inbox (shubhambhavar2821@gmail.com).'
          });
        } else if (res.message && res.message.toLowerCase().includes('activation')) {
          return of({
            success: true,
            needsActivation: true,
            message: 'Almost done! FormSubmit sent an "Activate Form" link to shubhambhavar2821@gmail.com. Please check your Gmail and click Activate once to receive all future messages!'
          });
        } else {
          return of({
            success: true,
            message: res.message || 'Thank you! Your message has been received.'
          });
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.warn('FormSubmit cloud error, trying local Node.js backend...', error.message);
        return this.sendViaLocalBackend(data);
      })
    );
  }

  /**
   * Fallback to local Node.js Express backend
   */
  private sendViaLocalBackend(data: ContactFormData): Observable<ContactApiResponse> {
    return this.http.post<ContactApiResponse>(this.backendApiUrl, data).pipe(
      timeout(6000),
      catchError((backendErr) => {
        return this.handleFallbackError(backendErr, data);
      })
    );
  }

  /**
   * Fire-and-forget message persistence to local backend / MongoDB
   */
  private logToLocalBackend(data: ContactFormData): void {
    this.http.post(this.backendApiUrl, data).subscribe({
      next: () => console.log('Message logged to local backend & MongoDB.'),
      error: () => {} // silent catch
    });
  }

  private handleFallbackError(error: any, data: ContactFormData) {
    const encodedSubject = encodeURIComponent(`[Portfolio Contact] ${data.subject}`);
    const encodedBody = encodeURIComponent(`Hi Shubham,\n\n${data.message}\n\nFrom: ${data.name}\nEmail: ${data.email}`);
    const mailtoUrl = `mailto:shubhambhavar2821@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;

    return throwError(() => ({
      message: 'Email service could not connect. Click "Open in Gmail" below to send your message instantly via Gmail client!',
      mailtoUrl: mailtoUrl,
      whatsappUrl: `https://wa.me/919890982446?text=${encodeURIComponent('Hello Shubham, ' + data.message)}`
    }));
  }
}
