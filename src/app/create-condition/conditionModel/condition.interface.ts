export interface Condition {
  property: string;
  operator: string;
  value: number;
}

export interface ConditionRuleModule{
  condition_name?: string;
  parent_condition?:string;
  rules:Rule[];
}

export interface Rule{
  inner_condition:string;
  rules: Condition[]
}
