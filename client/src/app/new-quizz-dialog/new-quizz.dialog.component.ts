import { Component, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-newquizz-dialog',
    templateUrl: './new-quizz.dialog.component.html',
})
export class NewQuizzDialogComponent {
    name: string;

    constructor(
        public dialogRef: MdDialogRef<NewQuizzDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ok() {
        if (!!this.name) {
            this.dialogRef.close(this.name);
        }
    }

    cancel() {
        this.dialogRef.close();
    }

}
