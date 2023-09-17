import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ConditionRuleModule,
  Rule,
} from '../conditionModel/condition.interface';
import { MatDialog } from '@angular/material/dialog';
import { SaveNewConditionComponent } from '../save-new-condition/save-new-condition.component';
@Component({
  selector: 'app-condition-form',
  templateUrl: './condition-form.component.html',
  styleUrls: ['./condition-form.component.css'],
})
export class ConditionFormComponent implements OnInit {
  @Input() preSavedConditions: ConditionRuleModule[] = [];
  @Output() sendNewConditionToParent: EventEmitter<ConditionRuleModule> =
    new EventEmitter();
  operatorsOptions: string[] = ['<', '<=', '=', '>', '>='];
  form!: FormGroup;
  selectedInnerOperator: string = 'and'; // sets and condition by default
  selectedGeneralOperator: string = 'and'; // sets and, or opperator for the general predefined condition
  selectedBindingOption!: Rule; // store the binding Obj that user selected
  newCondition: ConditionRuleModule | undefined; // store the new created condition;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog) {
    this.form = this.formBuilder.group({
      rows: this.formBuilder.array([]), // Create an empty FormArray
    });
  }

  ngOnInit() {
    //to add an empty row by default
    this.addRow();
  }

  get rowsArray(): FormArray {
    return this.form.get('rows') as FormArray;
  }

  addRow() {
    let propName =
      this.rowsArray.length > 0
        ? (this.rowsArray.at(this.rowsArray.length - 1) as FormGroup).get(
            'property'
          )?.value
        : '';
    const newRow = this.formBuilder.group({
      property: ['', Validators.required],
      operator: ['', Validators.required],
      value: [null, Validators.required],
    });
    if (propName) {
      newRow.get('property')?.setValue(propName);
    }

    this.rowsArray.push(newRow);
  }

  userClickOnNewRow() {
    if (this.selectedInnerOperator == '') {
      this.selectedInnerOperator = 'and'; /*set and condition by default*/
    }
    this.addRow();
  }

  removeRow(index: number) {
    this.selectedInnerOperator = '';
    this.rowsArray.removeAt(index);
  }

  //check if all fileds are filled by row
  areAllRowsFilled(): boolean {
    for (const control of this.rowsArray.controls) {
      if (control instanceof FormGroup) {
        const row = control as FormGroup;
        if (
          !row.get('property')?.valid ||
          !row.get('operator')?.valid ||
          !row.get('value')?.valid
        ) {
          return false; // Return false if any row is not filled
        }
      }
    }
    return true; // Return true if all rows are filled
  }

  checkIfCurrentRowIsFilled(row: any): boolean {
    let result =
      row.get('property')?.valid &&
      row.get('operator')?.valid &&
      row.get('value')?.valid;
    return result ? result : false;
  }

  saveCondOp(target: any) {
    this.selectedInnerOperator = target.value;
  }

  saveGeneralOpCond(target: any) {
    this.selectedGeneralOperator = target.value;
  }

  handleBindingChanges(value: any) {
    this.selectedBindingOption = value;
  }

  saveForm() {
    this.newCondition = {
      rules: [
        {
          inner_condition: this.selectedInnerOperator,
          rules: this.form.value.rows,
        },
      ],
    };
    if (this.selectedBindingOption) {
      this.newCondition.parent_condition = this.selectedGeneralOperator;
      this.newCondition.rules.push(this.selectedBindingOption);
    }

    const dialogRef = this.dialog.open(SaveNewConditionComponent, {
      data: this.formatObject(this.newCondition),
    });

    dialogRef.componentInstance.sendConfirmaion.subscribe((result) => {
      if (result) {
        this.sendNewConditionToParent.emit(this.newCondition);
        alert('Saved !')
        dialogRef.close();
      }
    });
  }

  formatObject(obj: any) {
    const conditions = obj.rules.map((rule: any) => {
      if (['and', 'or',''].includes(rule.inner_condition)) {
        return `(${rule.rules
          .map(
            (innerRule: any) =>
              `${innerRule.property} ${innerRule.operator} ${innerRule.value}`
          )
          .join(` ${rule.inner_condition} `)})`;
      } else {
        return `(${rule.property} ${rule.operator} ${rule.value})`;
      }
    });

    const conditionString = conditions.join(
      ` ${obj?.parent_condition ? obj?.parent_condition : obj.inner_condition} `
    );
    return conditionString;
  }
}
