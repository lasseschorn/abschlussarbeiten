import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Abschlussarbeit } from '../data/Abschlussarbeit';
import { AbschlussarbeitService } from '../service/abschlussarbeit.service';

@Component({
  selector: 'app-detailseite',
  templateUrl: './detailseite.component.html',
  styleUrls: ['./detailseite.component.css']
})
export class DetailseiteComponent implements OnInit {

  abschlussarbeit: Abschlussarbeit;
  constructor(private route: ActivatedRoute,
              private abschlussarbeitService: AbschlussarbeitService) { }

  ngOnInit() {
      this.abschlussarbeitService.getNo404( this.route.snapshot.params.id )
      .subscribe(abschlussarbeit => this.abschlussarbeit = abschlussarbeit);
    }
  }
