import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-finish-modal',
  standalone: true,
  imports: [],
  templateUrl: './test-finish-modal.component.html',
  styleUrl: './test-finish-modal.component.css'
})
export class TestFinishModalComponent {
  correctCount: number;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { correctCount: number },
    private router: Router,
    public dialogRef: MatDialogRef<TestFinishModalComponent> // Inject MatDialogRef to close the modal
  ) {
    this.correctCount = data.correctCount; // Initialize correctCount with the data passed from TestPageComponent
  }

  backToHomePage(): void {
    this.dialogRef.close(); // Close the modal
    this.router.navigate(['/home']); // Navigate back to the home page
  }

  ngOnInit(): void {}

  closeModal(): void {
    this.dialogRef.close();
  }

}
