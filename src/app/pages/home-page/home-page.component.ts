import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HeaderComponent } from '../../utilities/header/header.component';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    HeaderComponent,
    FormsModule,
    MatExpansionModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  selectedGrade: string = '9-1'; // Set a default value

  onClassSelectionChange(event: any) {
    this.selectedGrade = event.target.value;
  }
}
