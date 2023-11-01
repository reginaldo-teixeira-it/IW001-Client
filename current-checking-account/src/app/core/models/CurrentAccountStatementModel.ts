export class CurrentAccountStatementModel {
  id: number;
  description?: string;
  startdate: Date;
  value: number;
  loose: boolean;
  state: boolean;

  constructor(
    id: number,
    startDate: Date,
    value: number,
    loose: boolean,
    state: boolean,
    description?: string
  ) {
    this.id = id;
    this.startdate = startDate;
    this.value = value;
    this.loose = loose;
    this.state = state;
    this.description = description;
  }
}
