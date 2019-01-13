import { Component, OnInit } from '@angular/core';
import { BrancheService } from '../services/branche.service';
import { Branche } from '../Branche';
@Component({
  selector: 'app-branche',
  templateUrl: './branche.component.html',
  styleUrls: ['./branche.component.css']
})
export class BrancheComponent implements OnInit {

branchen: Branche[];
branche: Branche;

  constructor(private brancheService: BrancheService) { }

  ngOnInit() {
	  this.getBranchen();
  }
  getBranchen(): void {
  this.brancheService.getAllBranchen()
   .subscribe(branchen => this.branchen = branchen);
  }
  
  getBranche() {
    this.brancheService.getBranche(branche.id)
   .subscribe(branche => this.branche = branche);
  }

}
