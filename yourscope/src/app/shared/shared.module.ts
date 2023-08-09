import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BadgeComponent } from './components/badge/badge.component';


@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    CarouselComponent,
    TruncatePipe,
    NavbarComponent,
    BadgeComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    NgbCollapse,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  exports: [
    ConfirmationDialogComponent,
    CarouselComponent,
    TruncatePipe,
    NavbarComponent,
    NgMultiSelectDropDownModule,
    BadgeComponent
  ]
})
export class SharedModule { }
