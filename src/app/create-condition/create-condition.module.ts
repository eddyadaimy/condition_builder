import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateConditionComponent } from './create-condition.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { ConditionFormComponent } from './condition-form/condition-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SaveNewConditionComponent } from './save-new-condition/save-new-condition.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [CreateConditionComponent, ConditionFormComponent, SaveNewConditionComponent],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  exports:[
    CreateConditionComponent,
    SaveNewConditionComponent
  ]
})
export class CreateConditionModule { }
