import { Component, OnInit } from '@angular/core';
import { AkaGrad } from '../data/AkaGrad';
import { Studiengang } from '../data/Studiengang';
import { Kategorie } from '../data/Kategorie';
import { AkademischerGradService } from '../service/akademischer-grad.service';
import { StudiengangService } from '../service/studiengang.service';
import { KategorieService } from '../service/kategorie.service';
@Component({
  selector: 'app-person-erstellseite',
  templateUrl: './person-erstellseite.component.html',
  styleUrls: ['./person-erstellseite.component.css']
})
export class PersonErstellseiteComponent implements OnInit {

  akaGrade: AkaGrad[];
  studiengaenge: Studiengang[];
  kategorien: Kategorie[];
  place: string;

  constructor(private akaGradService: AkademischerGradService,
            private studiengangService: StudiengangService,
              private kategorieService: KategorieService) {}

    ngOnInit() {
      this.getAkaGrad();
      this.getStudiengaenge();
      this.getKategorien();
    }

    getStudiengaenge(): void {
      this.studiengangService.getAll().subscribe(studiengaenge => this.studiengaenge = studiengaenge);
    }
    getKategorien(): void {
      this.kategorieService.getAll().subscribe(kategorien => this.kategorien = kategorien);
    }
    getAkaGrad(): void {
      this.akaGradService.getAll().subscribe(akaGrade => this.akaGrade = akaGrade);
    }
}
