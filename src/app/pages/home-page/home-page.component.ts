import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HeaderComponent } from '../../utilities/header/header.component';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { Router } from '@angular/router';

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
  //Default values
  selectedTitle: string = 'Kintamieji';
  selectedDescription: string = 'Šis testas yra sukurtas siekiant įvertinti devintų klasių mokinių žinias apie tris pagrindinius C++ programavimo kalbos kintamuosius: int, double ir string. Testas padės nustatyti, kaip mokiniai supranta skirtingų tipų kintamųjų paskirtį, jų sintaksę ir praktinį jų panaudojimą programuojant.';
  selectedValue: string = '9-1';

  descriptions: { [key: string]: string } = {
    '9-1': 'Šis testas yra sukurtas siekiant įvertinti devintų klasių mokinių žinias apie tris pagrindinius C++ programavimo kalbos kintamuosius: int, double ir string. Testas padės nustatyti, kaip mokiniai supranta skirtingų tipų kintamųjų paskirtį, jų sintaksę ir praktinį jų panaudojimą programuojant.',
    '10-1': 'Šis testas skirtas įvertinti dešimtos klasės mokinių žinias apie tris pagrindinius C++ programavimo kalbos ciklus: for, while ir do-while. Testas padės nustatyti, kaip mokiniai supranta kiekvieno ciklo struktūrą, jų paskirtį ir tinkamą panaudojimą programų kūrimo procese.'
    // Additional keys can be added dynamically if needed
  };
  titles: { [key: string]: string } = {
    '9-1': 'Kintamieji',
    '10-1': 'Ciklai'
    // Additional keys can be added dynamically if needed
  };

  constructor(
    private router: Router
  ) {}

  onSelect(event: Event): void {
    const element = event.target as HTMLSelectElement; // Correct type assertion
    const value = element.value; // Now we can safely access 'value'
    this.selectedValue = value;
    this.selectedDescription = this.descriptions[value];
    this.selectedTitle = this.titles[value];
  }

  redirectToTest(): void {
    if (this.selectedValue) {
      this.router.navigate(['/test-page', { selectedValue: this.selectedValue }]);
    }
  }
}
