import { Component } from '@angular/core';
import { ConditionRuleModule } from './conditionModel/condition.interface';
import { FormBuilder } from '@angular/forms';
import { IndexedDbService } from './create-condition-services/indexed-db.service';

@Component({
  selector: 'app-create-condition',
  templateUrl: './create-condition.component.html',
  styleUrls: ['./create-condition.component.css'],
})
export class CreateConditionComponent {
  predifined_conditions: ConditionRuleModule[] =
  localStorage.getItem('saved_conditions')? JSON.parse(localStorage.getItem('saved_conditions') as string)
  :[
    {
        condition_name: 'Dumy Condtion',
        parent_condition:'and',
        rules:[{
        inner_condition:'or',
         rules: [{
            property: 'Prop1',
            operator: '=',
            value: 2,
          },
          {
            property: 'Prop1',
            operator: '=',
            value: 5,
          },
        ]
        },
        {
          inner_condition:'or',
           rules: [{
              property: 'Prop2',
              operator: '<',
              value: 10,
            },
            {
              property: 'Prop2',
              operator: '>',
              value: 20,
            },
          ]
          },
        ]
    },
  ];

  constructor(private indexedDbService: IndexedDbService){

  }

  //get new condition and store it in local storage
  fetchNewCondition(newCond:ConditionRuleModule){
    this.predifined_conditions.push(newCond);
    localStorage.setItem('saved_conditions',  JSON.stringify(this.predifined_conditions));
    this.indexedDbService.addCondition(JSON.stringify(this.predifined_conditions)).then((resp:any)=>{
      console.log(resp)
    })
  }

}
