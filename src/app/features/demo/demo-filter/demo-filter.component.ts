import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-demo-filter',
  templateUrl: './demo-filter.component.html',
})
export class DemoFilterComponent implements OnInit {
  @Output() closeEvent = new EventEmitter<any>();
  @Output() formEvent = new EventEmitter<any>();
  @Output() resetEvent = new EventEmitter<any>();
  @Input() initialFormFilter: any;

  formGroup: FormGroup | undefined;
  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      username: [],
      pic: [],
      dateFrom: [],
      dateTo: [],
    });
  }
  ngOnInit(): void {
    this.formGroup.patchValue({
      username: this.initialFormFilter?.username,
      pic: this.initialFormFilter?.pic,
      dateFrom: this.initialFormFilter?.dateFrom,
      dateTo: this.initialFormFilter?.dateTo,
      month: this.includesNull(this.initialFormFilter?.month) ? '00' : this.initialFormFilter?.month,
      day: this.includesNull(this.initialFormFilter?.day) ? '00' : this.initialFormFilter?.day,
      minute: this.includesNull(this.initialFormFilter?.minute) ? '00' : this.initialFormFilter?.minute,
      hour: this.includesNull(this.initialFormFilter?.hour) ? '00' : this.initialFormFilter?.hour,
    });
  }

  onSubmit(): void {
    this.formEvent.emit(this.formGroup.value);
    this.closeEvent.emit();
  }

  resetForm(): void {
    this.formGroup.reset();
    this.formEvent.emit(this.formGroup.value);
    this.resetEvent.emit();
    this.closeEvent.emit();
  }

  includesNull(val: any) {
    const nullVal = [null, 'null', undefined, 'undefined', '', [], '00'];
    return nullVal.includes(val);
  }
}
