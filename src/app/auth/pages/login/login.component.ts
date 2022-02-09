import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]);

  constructor( private router: Router ) { }

  ngOnInit(): void {

    localStorage.clear();

  }


  login() {

    if(this.username.valid){
      localStorage.setItem('userName', this.username.value);
      this.router.navigate(['./home/game']);
    }

    //this.username.valid ? this.router.navigate(['./home/game']) : null ;

  }

  getErrorMessage() {

    if(this.username.hasError('minlength')) {
      return 'The name must contain at least 2 characters.';
    }

    if(this.username.hasError('maxlength')) {
      return "The name can't have more than 25 characters.";
    }

    return this.username.hasError('required') ? 'A name is required.' : '';

  }

}
