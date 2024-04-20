import { Component } from '@angular/core';
import { HeaderComponent } from '../../utilities/header/header.component';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css'
})
export class SettingsPageComponent {

}
