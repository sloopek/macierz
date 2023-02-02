import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'macierz';

  // inicjalna liczba wierszy i kolumn (rozmiar macierzy)
  wiersze:number = 8
  kolumny:number = 10  

  // macierz przechowująca elementy (tablica-tablic)
  // pojedynczy element typu string (można do niego podsawić jakąś literkę, my podstawiamy 'z' lub 'n' (zolty/niebieski), by przypisac na tej podstawie odpowienią klasę css)
  public tMacierz: string[][]=[]

  // tablica przechowująca statystyki - docelowo w każdym wierszu (elemencie) ląduje kopia tabeli 'tMacierz'
  public wyniki:any[] = [];
  
  // zmienna pomocnicza przechowująca aktualny numer kolumny; 'schowek' zapamiętujący 'z' lub 'n' by zamienić ze sobą żetony
  public currCol:number =0;
  // aktualne powtórzenie mieszania żetonów
  public currLoop:number =0;
  // zmienna min/max wymagana do algorytmu liczącego liczbę losową z zadanego zakresu
  public minimum:number = 1
  public maximum:number = 10

  // zmienne przechowujące liczbę żetonów danego koloru po każdej ze stron: cntLZ (count Left Żółte)
  public cntLZ:number = 0
  public cntLN:number = 0
  public cntRZ:number = 0
  public cntRN:number = 0


  generujStanPoczatkowy(){

    // wyzerowanie macierzy
    this.tMacierz=[];

    // pętla w pętli do wygnerowania macierzy
    for(var i = 0; i<this.wiersze; i++){
      for(var j = 0; j<this.kolumny; j++){
        // w związku z tym, że mamy tablicę tablic, trzeba sprawdzić czy dla danego wiersza istnieje już tablica (jako wiersz); jeżeli nie to ją inicjujemy
        if(!this.tMacierz[i]){
          this.tMacierz[i]=[]
        }
        // inicjalizacja kolumn żetonem żółtym lub niebieskim
        // dzielimy liczbę kolumn na pół i to jest warunek do określenia koloru żetona
        this.tMacierz[i][j] = j < this.kolumny/2 ? 'z' : 'n'
      }
    }

    // zapamiętanie inicjalnej postaci macierzy
    this.wyniki.push(this.tMacierz.map(
      el => [...el]
    ))
    // liczymy statystyki
    this.liczStat();
  }



  mieszaj(){

    // przypisanie aktualnej liczby kolumn do losowania liczby losowej
    this.maximum = this.kolumny;

    for(var i = 0; i < this.kolumny * 5; i++){
      // wykorzytujemy opóźnienie by pokazać animację elementów
      setTimeout(()=>{
      for(var j=0; j<this.wiersze; j++){
        // generowanie liczby losowej
        let rndCol = Math.floor(Math.random() * (this.maximum - this.minimum + 1)) + this.minimum;

        // zamiana elementów
        let prevVal = this.tMacierz[j][rndCol];
        this.tMacierz[j][rndCol] = this.tMacierz[j][this.currCol];
        this.tMacierz[j][this.currCol] = prevVal;
      }


      let tmpArray = [...this.tMacierz];
      this.tMacierz.splice(0)
      tmpArray.forEach(
        el => this.tMacierz.push([...el])
      )

      // zwiększam liczniki
      this.currCol++;
      this.currLoop++;

      this.currCol = this.currCol >= this.kolumny ? 0 : this.currCol;

      // zapamiętanie wyników z kolejnego przebiegu
      if(this.currLoop % this.kolumny == 0){
        this.wyniki.push(this.tMacierz.map(
          el => [...el]
        ))

      console.log('wyniki', this.wyniki)

      this.liczStat();
      }
    }, i*300)
      }

  }

  // zliczanie statystyk
  liczStat(){
    this.cntLZ = 0
    this.cntLN = 0
    this.cntRZ = 0
    this.cntRN = 0

    console.log('liczę')

    this.tMacierz.forEach(
      (row, rIdx) => {
        row.forEach(
          (col, cIdx) => {
            if(cIdx < this.kolumny/2){
              if(col == 'z'){
                this.cntLZ++
              }else{
                this.cntLN++
              }
            }else{
              if(col == 'z'){
                this.cntRZ++
              }else{
                this.cntRN++
              }
            }
          } 
        )
      }
    )
  }
}
