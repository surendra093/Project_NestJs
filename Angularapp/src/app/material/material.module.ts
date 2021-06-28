import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { BrowserModule } from '@angular/platform-browser';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {Ng2OrderModule} from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    MatCheckboxModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    MatCheckboxModule
  ]
})
export class MaterialModule { }
