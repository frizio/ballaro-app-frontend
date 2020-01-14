import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add-market',
  templateUrl: './addmarket.component.html',
  styleUrls: ['./addmarket.component.css']
})
export class AddMarketComponent {
  checkoutForm;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
    this.checkoutForm = this.formBuilder.group({
      market: '',
      lat: '',
      lon: ''
    });
  }

  onSubmit(marketData) {
    this.http.post('http://localhost:3000/api/add-market', marketData).subscribe();
    // Process checkout data here
    console.warn('Market data has been submitted', marketData);
    this.snackBar.open('Salvato con successo', null, {
      duration: 3000,
    });
    this.checkoutForm.reset();
  }
}
