import { Mercato } from './../interfaces/mercato';
import { Porto } from './../interfaces/porto';
import { MercatiService } from './mercati.service';
import { PortiService } from './porti.service';
import { ColtivazioniService } from './coltivazioni.service';
import { Coltivazione } from './../interfaces/coltivazione';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  public navFlag: string;

  private coltivazioni = new BehaviorSubject<Coltivazione[]>(null);
  public coltivazioni$: Observable<Coltivazione[]> = this.coltivazioni.asObservable();

  private porti = new BehaviorSubject<Porto[]>(null);
  public porti$: Observable<Porto[]> = this.porti.asObservable();

  private mercati = new BehaviorSubject<Mercato[]>(null);
  public mercati$: Observable<Mercato[]> = this.mercati.asObservable();

  constructor(
    private coltivazioniService: ColtivazioniService,
    private mercatiService: MercatiService,
    private portiService: PortiService,
  ) { }


  getColtivazioni(county: string) {
    this.coltivazioni$ = this.coltivazioniService.getColtivazioni(county);
  }

  getPorti() {
    this.porti$ = this.portiService.getPorti();
  }

  getMercati() {
    this.mercati$ = this.mercatiService.getMercati();
  }

}
