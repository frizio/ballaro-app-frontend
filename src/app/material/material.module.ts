import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatSidenavModule, MatToolbarModule, MatListModule } from '@angular/material';


const moduleArray = [
                      MatButtonModule,
                      MatIconModule,
                      MatInputModule,
                      MatFormFieldModule,
                      MatSidenavModule,
                      MatToolbarModule,
                      MatListModule
                    ];

@NgModule({
  imports: moduleArray,
  exports: moduleArray
})
export class MaterialModule { }
