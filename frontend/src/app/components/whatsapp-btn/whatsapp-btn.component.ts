import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whatsapp-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatsapp-btn.component.html',
  styleUrl: './whatsapp-btn.component.scss'
})
export class WhatsappBtnComponent {
  whatsappUrl = 'https://wa.me/919890982446?text=Hello%20Shubham%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you.';
  showTooltip = true;

  closeTooltip(): void {
    this.showTooltip = false;
  }
}
