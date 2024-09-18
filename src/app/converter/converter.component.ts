import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyService } from '../services/currency.service';
import { ConversionHistoryComponent } from '../conversion-history/conversion-history.component';

interface ConversionRecord {
  fromAmount: number;
  fromCurrency: string;
  toAmount: number;
  toCurrency: string;
  date: Date;
}

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [CommonModule, FormsModule, ConversionHistoryComponent],
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  amount1: number = 1;
  amount2: number = 1;
  currency1: string = 'UAH';
  currency2: string = 'USD';
  rates: { [key: string]: number } = {};
  currencies = ['UAH', 'USD', 'EUR'];
  conversionHistory: ConversionRecord[] = [];
  errorMessage: string | null = null;

  private lastConversion: { from: string, to: string, rate: number } | null = null;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.fetchRates();
  }

  fetchRates() {
    this.currencyService.getExchangeRates().subscribe(
      rates => {
        this.rates = rates;
        this.convert(1);
        this.errorMessage = null;
      },
      error => {
        console.error('Error fetching exchange rates:', error);
        this.errorMessage = error.message;
      }
    );
  }

  convert(direction: number) {
    if (this.errorMessage) return;

    const rate = this.getConversionRate(this.currency1, this.currency2);

    if (direction === 1) {
      this.amount2 = +(this.amount1 * rate).toFixed(2);
    } else {
      this.amount1 = +(this.amount2 / rate).toFixed(2);
    }
    this.addToHistory();
  }

  private getConversionRate(from: string, to: string): number {
    if (this.lastConversion && this.lastConversion.from === from && this.lastConversion.to === to) {
      return this.lastConversion.rate;
    }

    const rate = this.rates[to] / this.rates[from];
    this.lastConversion = { from, to, rate };
    return rate;
  }

  addToHistory() {
    const record: ConversionRecord = {
      fromAmount: this.amount1,
      fromCurrency: this.currency1,
      toAmount: this.amount2,
      toCurrency: this.currency2,
      date: new Date()
    };
    this.conversionHistory.unshift(record);
    if (this.conversionHistory.length > 10) {
      this.conversionHistory.pop();
    }
  }
}
