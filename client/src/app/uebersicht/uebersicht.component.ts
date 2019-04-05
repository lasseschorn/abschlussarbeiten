import { Component, OnInit } from '@angular/core';
//Entitäten
import { Branche } from '../data/Branche';
import { Studiengang } from '../data/Studiengang';
import { Kategorie } from '../data/Kategorie';
import { Abschlussarbeit } from '../data/Abschlussarbeit';
//Services
import { BrancheService } from '../service/branche.service';
import { StudiengangService } from '../service/studiengang.service';
import { KategorieService } from '../service/kategorie.service';
import { AbschlussarbeitService } from '../service/abschlussarbeit.service';


@Component({
  selector: 'app-uebersicht',
  templateUrl: './uebersicht.component.html',
  styleUrls: ['./uebersicht.component.css']
})
export class UebersichtComponent implements OnInit {
  searchText: string;
  branchen: Branche[];
  studiengaenge: Studiengang[];
  kategorien: Kategorie[];
  abschlussarbeiten: Abschlussarbeit[];

  constructor(private brancheService: BrancheService,
              private studiengangService: StudiengangService,
              private kategorieService: KategorieService,
              private abschlussarbeitService: AbschlussarbeitService,
             ) { }

  ngOnInit() {
//    this.getBranchen();
    this.getStudiengaenge();
    this.getKategorien();
    this.getAbschlussarbeiten();
  }

  getBranchen(): void {
    this.brancheService.getAll()
    .subscribe(branchen => this.branchen = branchen);
  }
  getStudiengaenge(): void {
    this.studiengangService.getAll()
    .subscribe(studiengaenge => this.studiengaenge = studiengaenge);
  }
  getKategorien(): void {
    this.kategorieService.getAll()
    .subscribe(kategorien => this.kategorien = kategorien);
  }
  getAbschlussarbeiten(): void {
    this.abschlussarbeitService.getAll()
    .subscribe(abschlussarbeiten => this.abschlussarbeiten = abschlussarbeiten);
  }
  suchen(event): void {
    event.preventDefault();
    const target = event.target;
    const kid = target.querySelector('#kategorie').value;
    const sid = target.querySelector('#studiengang').value;

    this.abschlussarbeitService.findAbschlussarbeiten(kid, sid)
    .subscribe(abschlussarbeiten => this.abschlussarbeiten = abschlussarbeiten);
}
}
