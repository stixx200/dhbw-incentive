import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const materialModules = [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatChipsModule,
    MatAutocompleteModule,
];

@NgModule({
  imports: materialModules,
  exports: materialModules,
})
export class MaterialModule { }
