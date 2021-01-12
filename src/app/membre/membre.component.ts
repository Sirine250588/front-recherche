import { These } from './../model/these';
import { MembreService } from './../service/membre.service';
import { EquipeService } from './../service/equipe.service';
import { TheseService } from './../service/these.service';
import { ForumService } from './../service/forum.service';
import { Router } from '@angular/router';
import { Membre } from './../model/membre';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  styleUrls: ['./membre.component.css']
})
export class MembreComponent implements OnInit {

  membreForm : FormGroup;
  modifForme : FormGroup;
  submited    = false;
  submitmodif = false;
  listmembre;
  listforum;
  listthese;
  listequipe;
  idmemebre;
  membree = new Membre();
  fileToUpload:File=null;


  constructor(private formbuilder:FormBuilder,private router:Router,private forumservice:ForumService,
    private theseservice:TheseService,private equipeservice:EquipeService,private memebreservice:MembreService) {}

  ngOnInit() {
    this.getmembre();
    this.getequipe();
    this.getthese();
    this.getforum();


// Partie Ajout Membre

        this.membreForm = this.formbuilder.group({
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
          type: ['', Validators.required],

          these : ['', Validators.required],
          equipe : ['', Validators.required],
        });

// Partie Modifier Membre

        this.modifForme = this.formbuilder.group({
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
          type: ['', Validators.required],

          these : ['', Validators.required],
          equipe : ['', Validators.required],
        });

}


      get f2() {
        return this.membreForm.controls;
      }
      get fmodif() {
        return this.modifForme.controls;
      }
// Fonction Ajout Membre
      membre() {
        this.submited = true;
        let formdata=new FormData();
        formdata.append("usernameutilisateur",this.membreForm.value.usernameutilisateur);
        formdata.append("passwordutilisateur",this.membreForm.value.passwordutilisateur);
        formdata.append("firstnameutilisateur",this.membreForm.value.firstnameutilisateur);
        formdata.append("lastnameutilisateur",this.membreForm.value.lastnameutilisateur);
        formdata.append("nomutilisateur",this.membreForm.value.nomutilisateur);
        formdata.append("prenomutilisateur",this.membreForm.value.prenomutilisateur);
        formdata.append("datenaissanceutilisateur",this.membreForm.value.datenaissanceutilisateur);
        formdata.append("emailutilisateur",this.membreForm.value.emailutilisateur);
        formdata.append("sexeutilisateur",this.membreForm.value.sexeutilisateur);
        formdata.append("telephoneutilisateur",this.membreForm.value.telephoneutilisateur);
        formdata.append("adresseutilisateur",this.membreForm.value.adresseutilisateur);
        formdata.append("gradeutilisateur",this.membreForm.value.gradeutilisateur);
        formdata.append("type",this.membreForm.value.type);
        formdata.append("file",this.fileToUpload);
        this.memebreservice.membre(formdata,this.membreForm.value.these,this.membreForm.value.equipe).subscribe(res1 => {
          console.log(res1);
          window.location.reload();
        });
      }

      handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
        console.log(this.fileToUpload);
      }



// Afficher les thèses
       getthese(){
         this.theseservice.getall().subscribe(res=>{
           console.log(res, 'listthese');
           this.listthese=res;
          })
        }
// Afficher les membres
      getmembre(){
       this.memebreservice.getallmembre().subscribe(res=>{
         console.log(res, 'listmembre');
         this.listmembre=res;
       })
      }
// Afficher les forums
      getforum(){
        this.forumservice.getallforum().subscribe(res=>{
          console.log(res, 'listforum');
          this.listforum=res;
        })
      }
// Afficher les equipes
      getequipe(){
        this.equipeservice.getallequipe().subscribe(res=>{
          console.log(res, 'listequipe');
          this.listequipe=res;
        })
      }

// les autres fonctions

delete(id) {
  Swal.fire({

    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, Supprimer!'
  }).then((result) => {
    if (result.value) {
      this.memebreservice.supprimermembre(id).subscribe(res => {
        this.getmembre();
      });
      Swal.fire(
        'Suprimer!',
        this.membree.nomutilisateur + '' + this.membree.prenomutilisateur + '' + 'Bien Supprimer',
        'success'
      );

    }
  });
}

modifmembre() {
  this.submitmodif = true;
  const data4 = {
    usernameutilisateur: this.modifForme.value.usernameutilisateur,
    passwordutilisateur: this.modifForme.value.passwordutilisateur,
    firstnameutilisateur: this.modifForme.value.firstnameutilisateur,
    lastnameutilisateur: this.modifForme.value.lastnameutilisateur,
    nomutilisateur: this.modifForme.value.nomutilisateur,
    prenomutilisateur: this.modifForme.value.prenomutilisateur,
    datenaissanceutilisateur: this.modifForme.value.datenaissanceutilisateur,
    emailutilisateur: this.modifForme.value.emailutilisateur,
    sexeutilisateur: this.modifForme.value.sexeutilisateur,
    telephoneutilisateur: this.modifForme.value.telephoneutilisateur,
    adresseutilisateur: this.modifForme.value.adresseutilisateur,
    photoutilisateur: this.modifForme.value.photoutilisateur,
    gradeutilisateur: this.modifForme.value.gradeutilisateur,
    type: this.modifForme.value.type
  };
  console.log(data4);

  this.memebreservice.modifiermembre(data4,this.membree.idutilisateur,this.membreForm.value.these,this.membreForm.value.equipe).subscribe(res => {
    console.log(res);
    console.log('bien modifier');
    this.getmembre();
    this.submitmodif=false;
    this.modifForme.reset();
    window.location.reload();
  });
}

recuper(idutilisateur,usernameutilisateur,passwordutilisateur,firstnameutilisateur,lastnameutilisateur,nomutilisateur,prenomutilisateur,datenaissanceutilisateur,emailutilisateur,sexeutilisateur,telephoneutilisateur, adresseutilisateur,photoutilisateur,gradeutilisateur,type,these,equipe) {
  this.membree.idutilisateur            = idutilisateur;
  this.membree.usernameutilisateur      = usernameutilisateur;
  this.membree.passwordutilisateur      = passwordutilisateur;
  this.membree.firstnameutilisateur     = firstnameutilisateur;
  this.membree.lastnameutilisateur      = lastnameutilisateur;
  this.membree.nomutilisateur           = nomutilisateur;
  this.membree.prenomutilisateur        = prenomutilisateur;
  this.membree.datenaissanceutilisateur = datenaissanceutilisateur;
  this.membree.emailutilisateur         = emailutilisateur;
  this.membree.sexeutilisateur          = sexeutilisateur;
  this.membree.telephoneutilisateur     = telephoneutilisateur;
  this.membree.adresseutilisateur       = adresseutilisateur;
  this.membree.photoutilisateur         = photoutilisateur;
  this.membree.gradeutilisateur         = gradeutilisateur;
  this.membree.type                     = type;

  this.membree.these                    = these;
  this.membree.equipe                   = equipe;

  console.log(idutilisateur,usernameutilisateur,passwordutilisateur,firstnameutilisateur,lastnameutilisateur,nomutilisateur,prenomutilisateur,datenaissanceutilisateur,emailutilisateur,sexeutilisateur,telephoneutilisateur, adresseutilisateur,photoutilisateur,gradeutilisateur,type,these,equipe)
  console.log(this.membree);
}

}
