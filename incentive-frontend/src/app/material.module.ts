import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const materialModules = [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
];

@NgModule({
  imports: materialModules,
  exports: materialModules,
})
export class MaterialModule { }
