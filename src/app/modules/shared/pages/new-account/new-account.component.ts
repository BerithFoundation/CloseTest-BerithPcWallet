import { Component, Input, OnInit} from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd'
import { BerithService } from '../../../../services/berith.service';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent implements OnInit {

  @Input() isVisible = false;

  password: string;
  confirmPassword: string;
  passwordVisible = false;
  confirmPasswordVisible = false;

  newAccountForm: FormGroup;

  constructor(private message: NzMessageService,
    private berithService: BerithService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.newAccountForm = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, this.confirmationValidator]],
    });

    
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.newAccountForm.controls.confirmPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.newAccountForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  handleOk(): void {
    console.warn(this.newAccountForm.value);

    if (this.newAccountForm.invalid) {
      return;
    }

    let result = this.berithService.createAccount(this.newAccountForm.value.password);
    if (result) {
      this.message.success('계정이 생성 되었습니다.', {
        nzDuration: 3000
      });
    }

    this.resetFormState();
  }

  handleCancel(): void {
    this.resetFormState();
  }

  resetFormState() {
    this.password = '';
    this.passwordVisible = false;
    this.confirmPassword = '';
    this.confirmPasswordVisible = false;
    this.isVisible = false;
    if (this.newAccountForm != null) {
      this.newAccountForm.reset();
    }
  }
}
