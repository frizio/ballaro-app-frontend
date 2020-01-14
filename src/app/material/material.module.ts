import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatSidenavModule, MatToolbarModule, MatListModule, MatCardModule, MatTableModule } from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';


const moduleArray = [
                      MatButtonModule,
                      MatIconModule,
                      MatInputModule,
                      MatFormFieldModule,
                      MatSidenavModule,
                      MatToolbarModule,
                      MatListModule,
                      MatCardModule,
                      MatTableModule,
                      MatSnackBarModule
                    ];

@NgModule({
  imports: moduleArray,
  exports: moduleArray
})
export class MaterialModule { }
