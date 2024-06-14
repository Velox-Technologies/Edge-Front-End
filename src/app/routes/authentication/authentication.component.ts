import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../services/common/toast/toast.service';
import { ToastComponent } from '../../components/common/toast/toast.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  user: any;
  loginForm: FormGroup;

  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  constructor(
    private AuthService: AuthenticationService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private titleService: Title
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.titleService.setTitle('Authentication');
  }

  ngOnInit() {
    this.AuthService.returnUser().subscribe((user) => {
      this.user = user;
    });
  }

  ngAfterViewInit(): void {
    this.toastService.setToastComponent(this.toastComponent);
  }

  async loginWithGoogle() {
    try {
      await this.AuthService.signInWithGoogle();
    } catch (error) {
      this.toastComponent.showToast(
        'Something Went Wrong. Please Try Again Later',
        5000,
        'error'
      );
    }
  }

  async loginWithGithub() {
    try {
      await this.AuthService.signInWithGithub();
    } catch (error) {
      if (
        (error as any)?.code === 'auth/account-exists-with-different-credential'
      ) {
        this.toastComponent.showToast(
          'This Account Is Already Registered With Google',
          5000,
          'error'
        );
      } else {
        this.toastComponent.showToast(
          'Something Went Wrong. Please Try Again Later',
          5000,
          'error'
        );
      }
    }
  }

  login() {
    if (this.loginForm.valid) {
      try {
        // TODO: Implement login functionality API
        this.toastComponent.showToast(
          'Logged In Successfully',
          5000,
          'success'
        );
      } catch (error) {
        this.toastComponent.showToast('Something Went Wrong', 5000, 'error');
      }
    } else {
      this.toastComponent.showToast('Enter values correctly', 5000, 'error');
    }
  }
}
