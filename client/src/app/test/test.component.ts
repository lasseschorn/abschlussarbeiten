import { Component, OnInit } from '@angular/core';
import { Branche } from '../Branche';
import { BrancheService } from '../service/branche.service';
import { Observable } from 'rxjs';
import {catchError, map,  } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
    branchen: Branche[];
    branche: Branche;
    selectedBranche: Branche;
    deletedBranche: Branche;
    updatedBranche: Branche;
    getByIdBranche: Branche;
    addedBranche: Branche;

  constructor(  private brancheService: BrancheService,
                private route: ActivatedRoute,
                private location: Location
) { }

  ngOnInit() {
        this.getBranchen();
  }

  getBranchen(): void {
    this.brancheService.getAll()
    .subscribe(branchen => this.branchen = branchen);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.brancheService.add(name)
      .subscribe(branche => {
        this.branchen.push(branche);
      });
  }

  delete(branche: Branche): void {
    this.branchen = this.branchen.filter(h => h !== branche);
    this.brancheService.delete(branche.BranchenID).subscribe();
  }

  get(id: number): void {
//    const id = +this.route.snapshot.paramMap.get('id');
    this.brancheService.getNo404(id)
      .subscribe(branche => this.getByIdBranche = branche);
  }

}
