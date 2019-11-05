import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatSidenavModule, MatToolbarModule, MatListModule, MatCardModule, MatTableModule } from '@angular/material';


const moduleArray = [
                      MatButtonModule,
                      MatIconModule,
                      MatInputModule,
                      MatFormFieldModule,
                      MatSidenavModule,
                      MatToolbarModule,
                      MatListModule,
                      MatCardModule,
                      MatTableModule
                    ];

@NgModule({
  imports: moduleArray,
  exports: moduleArray
})
export class MaterialModule { }
