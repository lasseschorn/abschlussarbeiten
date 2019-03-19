import { Component, OnInit } from '@angular/core';
import { Branche } from '../Branche';
import { BrancheService } from '../service/branche.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
    branchen: Branche[];

selectedBranche: Branche;
deletedBranche: Branche;
updatedBranche: Branche;
getByIdBranche: Branche;
addedBranche: Branche;

  constructor(private brancheService: BrancheService) { }

  ngOnInit() {
        this.getBranchen();
  }

    onSelect(branche: Branche): void {
        this.selectedBranche = branche;
}
    getBranchen(): void {
        this.brancheService.getAll()
        .subscribe(branchen => this.branchen = branchen);
}
    getBranche(id: number): void {
        this.brancheService.get(id)
        .subscribe(branche => this.getByIdBranche = branche);
    }
    updateBranche(id: number, bez: string ): void {
        this.brancheService.update(id, bez)
        .subscribe(branche => this.updatedBranche = branche);
    }
    addBrunche(bez: string): void {
        this.brancheService.add(bez)
        .subscribe(branche => this.addedBranche = branche);
    }
    deleteBranche(id: number): void {
        this.brancheService.delete(id)
        .subscribe( branche => this.deletedBranche = branche);
    }


}
