import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MaterialModule} from './material/material.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './Home/Home.component';
import { addAndUpdateOpeningComponent } from './addAndUpdateOpening/addAndUpdateOpening.component';
import {SharedService} from './shared.service';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SearchfilterPipe } from './searchfilter.pipe';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    addAndUpdateOpeningComponent,
    SearchfilterPipe,
    MatConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent],
  entryComponents: [addAndUpdateOpeningComponent,MatConfirmDialogComponent]
})
export class AppModule { }
