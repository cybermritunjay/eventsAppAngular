import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData={ };
  formError=""
  constructor(private _auth: AuthService,
    private _router: Router) { }

  ngOnInit() {
  }
  loginUser(loginForm){
    if (loginForm.valid){
      this._auth.loginUser(this.loginUserData).subscribe(
        res => {
          console.log(res),
          sessionStorage.setItem('token', res.token),
          sessionStorage.setItem('userName',res.user.name),
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
