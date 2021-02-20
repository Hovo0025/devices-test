import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@core/api-services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public signInForm: FormGroup;
  public processing = false;
  public serverErrorMsg: string;

  constructor(private fBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.initForm();
  }

  public initForm() {
    this.signInForm = this.fBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  public onSignIn() {
    if (this.signInForm.invalid) {
      return;
    }

    this.processing = true;
    const requestData = this.signInForm.value;
    this.authService.signIn(requestData)
      .subscribe((res) => {
        this.processing = false;
        this.router.navigate(['/devices']);
      }, err => {
        this.processing = false;
        this.serverErrorMsg = err;
      });
  }
}
