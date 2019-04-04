import { Component, OnInit } from '@angular/core';
import { Branche } from '../data/Branche';
import { Studiengang } from '../data/Studiengang';
import { Kategorie } from '../data/Kategorie';
//Services
import { BrancheService } from '../service/branche.service';
import { StudiengangService } from '../service/studiengang.service';
import { KategorieService } from '../service/kategorie.service';
@Component({
  selector: 'app-erstell-seite',
  templateUrl: './erstell-seite.component.html',
  styleUrls: ['./erstell-seite.component.css']
})
export class ErstellSeiteComponent implements OnInit {
  branchen: Branche[];
  studiengaenge: Studiengang[];
  kategorien: Kategorie[];
  place: string;

  constructor(private brancheService: BrancheService,
              private studiengangService: StudiengangService,
              private kategorieService: KategorieService) { }

  ngOnInit() {
    this.getBranchen();
    this.getStudiengaenge();
    this.getKategorien();
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

}
