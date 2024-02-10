import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-success-modal',
  standalone: true,
  imports: [],
  templateUrl: './success-modal.component.html',
  styleUrl: './success-modal.component.css',
})
export class SuccessModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    public dialogRef: MatDialogRef<SuccessModalComponent>,
    private router: Router
  ) {}

  get successMessage(): string {
    return this.data.message;
  }

  ngOnInit(): void {}

  closeModal(): void {
    this.dialogRef.close();
    this.router.navigate(['/']);
  }
}
