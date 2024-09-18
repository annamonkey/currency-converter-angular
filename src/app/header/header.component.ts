import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  usdRate: number | null = null;
  eurRate: number | null = null;
  source: string = 'ExchangeRate-API';
  updateDate: Date = new Date();

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.currencyService.getExchangeRates().subscribe(
      rates => {
        this.usdRate = +(1 / rates['USD']).toFixed(2);
        this.eurRate = +(1 / rates['EUR']).toFixed(2);
        this.updateDate = new Date(); // Обновляем дату при получении новых курсов
      },
      error => console.error('Error fetching exchange rates:', error)
    );
  }
}
