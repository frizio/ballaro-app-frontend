import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';


const moduleArray = [
                      MatButtonModule,
                      MatIconModule
                    ];

@NgModule({
  imports: moduleArray,
  exports: moduleArray
})
export class MaterialModule { }
