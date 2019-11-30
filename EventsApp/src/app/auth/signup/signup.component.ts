import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  regiserUserData = { };
  passwordMatch = true;
  formError=""
  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
  }
  signupSubmit(signupForm){
    if (signupForm.valid){
      this._auth.registerUser(this.regiserUserData).subscribe(
        res => {
          console.log(res),
          sessionStorage.setItem('token', res.token)
          this._router.navigate(['/admin-dash'])
        },
        err => this.formError=err.error
      )
    }else{
      this.formError="All fields Must Be Filled Properly"
      //alert("sometging went wrong")
    }
  }
  
}
