import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

interface ConversionRecord {
  fromAmount: number;
  fromCurrency: string;
  toAmount: number;
  toCurrency: string;
  date: Date;
}

@Component({
  selector: 'app-conversion-history',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe],
  template: `
    <div class="history-container">
      <h2>Історія конвертацій</h2>
      <ul class="history-list">
        <li *ngFor="let record of history" class="history-item">
          <span class="conversion">
            {{ record.fromAmount | number:'1.2-2' }} {{ record.fromCurrency }} =
            {{ record.toAmount | number:'1.2-2' }} {{ record.toCurrency }}
          </span>
          <span class="date">{{ record.date | date:'dd.MM.yyyy HH:mm' }}</span>
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./conversion-history.component.scss']
})
export class ConversionHistoryComponent {
  @Input() history: ConversionRecord[] = [];
}
