import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'macierz';

  zmienna01 = 'kot ma alę'

  wiersze:number = 8
  kolumny:number = 10
  // wynik:number = 0

  cols:number[] = []
  rows:number[] = []

  dodajLiczby(){

    this.cols = [];
    this.rows = [];
    for(let i = 0; i<this.kolumny; i++){
      this.cols.push(i)
    }
    for(let i = 0; i<this.wiersze; i++){
      this.rows.push(i)
    }

    // this.wynik = this.liczba1 + this.liczba2;
  }
}
