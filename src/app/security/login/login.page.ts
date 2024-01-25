import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthRequest } from '../auth-request.model';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class LoginPage {
  authRequest: Partial<AuthRequest> = {};
  loginError = false;
 
  constructor(
    private auth: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.authRequest = {};
  }
 
  async onSubmit(form: NgForm) {
    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }
 
    // Hide any previous login error.
    this.loginError = false;
 
    try {
      await this.auth.logIn$(this.authRequest as AuthRequest).toPromise();
      this.router.navigateByUrl('/');
    } catch (err) {
      this.loginError = true;
      const alert = await this.alertController.create({
        header: 'Oupsssi !',
        message: "Le nom d'utilisateur ou le mot de passe est incorrect.",
        buttons: ['OK'],
      });
      await alert.present();
      //console.warn(`Authentication failed: ${err.message}`);
    }
  }
}