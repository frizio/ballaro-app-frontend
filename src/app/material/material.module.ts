import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule } from '@angular/material';


const moduleArray = [
                      MatButtonModule,
                      MatIconModule,
                      MatInputModule,
                      MatFormFieldModule
                    ];

@NgModule({
  imports: moduleArray,
  exports: moduleArray
})
export class MaterialModule { }
