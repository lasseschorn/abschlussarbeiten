import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Abschlussarbeit } from '../data/Abschlussarbeit';
import { AbschlussarbeitService } from '../service/abschlussarbeit.service';
import { StudentService } from '../service/student.service';
import { UnternehmenService } from '../service/unternehmen.service';
import { DozentService } from '../service/dozent.service';
import { Dozent } from '../data/Dozent';
import { Betreuer } from '../data/Betreuer';
import { Student } from '../data/Student';
import { Unternehmen } from '../data/Unternehmen';

@Component({
  selector: 'app-detailseite',
  templateUrl: './detailseite.component.html',
  styleUrls: ['./detailseite.component.css']
})
export class DetailseiteComponent implements OnInit {

  abschlussarbeit: Abschlussarbeit;
  dozent: Dozent;
  unternehmen: Unternehmen;
  student: Student;

  constructor(private route: ActivatedRoute,
              private abschlussarbeitService: AbschlussarbeitService,
              private studentService: StudentService,
              private unternehmenService: UnternehmenService,
              private dozentService: DozentService) { }

  ngOnInit() {
      this.abschlussarbeitService.getNo404( this.route.snapshot.params.id )
      .subscribe(abschlussarbeit => this.abschlussarbeit = abschlussarbeit);
      this.studentService.getNo404( this.abschlussarbeit.studentID)
      .subscribe(student => this.student = student);
      this.dozentService.getNo404(this.abschlussarbeit.dozentID)
      .subscribe(dozent => this.dozent = dozent);
      this.unternehmenService.getNo404(this.abschlussarbeit.unternehmensID)
      .subscribe(unternehmen => this.unternehmen  = unternehmen );
    }


  }
