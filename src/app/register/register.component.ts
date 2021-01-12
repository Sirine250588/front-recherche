import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";
import {register} from "ts-node";
import Swal from 'sweetalert2';
import {TheseService} from "../service/these.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loginform: FormGroup;
  registerForm: FormGroup;
  submited = false;
  listthese;
  fileToUpload:File=null;
  constructor(private formbuilder: FormBuilder, private router: Router,
              private loginservice: UserService , private theseservice:TheseService) {
  }

  ngOnInit() {
    this.getthese();
    // Partie Login
    this.loginform = this.formbuilder.group({
      usernameutilisateur: ['', Validators.required],
      passwordutilisateur: ['', Validators.required]
    });

    // Partie Register
    this.registerForm = this.formbuilder.group({
      usernameutilisateur: ['', Validators.required],
      passwordutilisateur: ['', Validators.required],
      firstnameutilisateur: ['', Validators.required],
      lastnameutilisateur: ['', Validators.required],
      nomutilisateur: ['', Validators.required],
      prenomutilisateur: ['', Validators.required],
      datenaissanceutilisateur :['' ,Validators.required],
      emailutilisateur: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      sexeutilisateur: ['', Validators.required],
      telephoneutilisateur: ['', Validators.required],
      adresseutilisateur: ['', Validators.required],
      photoutilisateur   : ['', Validators.required],
      gradeutilisateur: ['', Validators.required],
      these : ['', Validators.required],

    });


  }

  get f() {
    return this.loginform.controls;
  }

  get f1() {
    return this.registerForm.controls;
  }



// Register

  register() {
    this.submited = true;

    let formdata=new FormData();
    formdata.append("usernameutilisateur",this.registerForm.value.usernameutilisateur);
    formdata.append("passwordutilisateur",this.registerForm.value.passwordutilisateur);
    formdata.append("firstnameutilisateur",this.registerForm.value.firstnameutilisateur);
    formdata.append("lastnameutilisateur",this.registerForm.value.lastnameutilisateur);
    formdata.append("nomutilisateur",this.registerForm.value.nomutilisateur);
    formdata.append("prenomutilisateur",this.registerForm.value.prenomutilisateur);
    formdata.append("datenaissanceutilisateur",this.registerForm.value.datenaissanceutilisateur);
    formdata.append("emailutilisateur",this.registerForm.value.emailutilisateur);
    formdata.append("sexeutilisateur",this.registerForm.value.sexeutilisateur);
    formdata.append("telephoneutilisateur",this.registerForm.value.telephoneutilisateur);
    formdata.append("adresseutilisateur",this.registerForm.value.adresseutilisateur);
    formdata.append("gradeutilisateur",this.registerForm.value.gradeutilisateur);
    formdata.append("file",this.fileToUpload);
    this.loginservice.register(formdata,this.registerForm.value.these).subscribe(res1 => {
      console.log(res1);
      this.router.navigate(['home']);

    });
  }

handleFileInput(files: FileList) {
  this.fileToUpload = files.item(0);
  console.log(this.fileToUpload);

}

// Afficher les thèses
  getthese(){
    this.theseservice.getall().subscribe(res=>{
      console.log(res);
      this.listthese=res;
    })
  }

  // login

  login() {
    this.submited = true;
    if (this.loginform.invalid) {
      return;}
    this.loginservice.login(this.loginform.value).subscribe((res: any) => {
      console.log(res);
      const jwt = res.headers.get('Authorization');
      this.loginservice.saveToken(jwt);

    }, a => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'nom utilsateur ou mdp de passe incorrecte!',

      });
    });
  }

}
