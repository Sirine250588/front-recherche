import { StagaireService } from './../service/stagaire.service';
import { Stagaire } from './../model/stagaire';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TheseService } from '../service/these.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stagaire',
  templateUrl: './stagaire.component.html',
  styleUrls: ['./stagaire.component.css']
})
export class StagaireComponent implements OnInit {
  StagaireForm: FormGroup;
  StagaireFormModif: FormGroup;
  submitedstagaire   = false;
  submitmodifstagaire = false;
  listthese;
  liststagaire;
  idstagaire;
  stagairee = new Stagaire();
  fileToUpload:File=null;

// Rest Code

  constructor(private formbuilder:FormBuilder,private router:Router,
    private theseservice:TheseService,private stagaireservice:StagaireService) {}

  ngOnInit() {
    this.getstagaire();
    this.getthese();

// Partie Ajout Stagaire

        this.StagaireForm = this.formbuilder.group({
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

// Partie Modifier Stagaire

        this.StagaireFormModif = this.formbuilder.group({
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

get fctajoutstagaire() {
        return this.StagaireForm.controls;
      }
      get fctmodifstagaire() {
        return this.StagaireFormModif.controls;
      }
// Fonction Ajout Stagaire

      stagaire() {
        this.submitedstagaire = true;
        let formdata=new FormData();
        formdata.append("usernameutilisateur",this.StagaireForm.value.usernameutilisateur);
        formdata.append("passwordutilisateur",this.StagaireForm.value.passwordutilisateur);
        formdata.append("firstnameutilisateur",this.StagaireForm.value.firstnameutilisateur);
        formdata.append("lastnameutilisateur",this.StagaireForm.value.lastnameutilisateur);
        formdata.append("nomutilisateur",this.StagaireForm.value.nomutilisateur);
        formdata.append("prenomutilisateur",this.StagaireForm.value.prenomutilisateur);
        formdata.append("datenaissanceutilisateur",this.StagaireForm.value.datenaissanceutilisateur);
        formdata.append("emailutilisateur",this.StagaireForm.value.emailutilisateur);
        formdata.append("sexeutilisateur",this.StagaireForm.value.sexeutilisateur);
        formdata.append("telephoneutilisateur",this.StagaireForm.value.telephoneutilisateur);
        formdata.append("adresseutilisateur",this.StagaireForm.value.adresseutilisateur);
        formdata.append("gradeutilisateur",this.StagaireForm.value.gradeutilisateur);

        formdata.append("file",this.fileToUpload);
        this.stagaireservice.stagaire(formdata,this.StagaireForm.value.these).subscribe(res1 => {
          console.log(res1);
          window.location.reload();
        });
      }

      handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
        console.log(this.fileToUpload);
      }



// Afficher les stagaires
       getstagaire(){
         this.stagaireservice.getallstagaire().subscribe(res=>{
           console.log(res, 'liststagaire');
           this.liststagaire=res;
          })
        }
// Afficher les thèses
getthese(){
  this.theseservice.getall().subscribe(res=>{
    console.log(res, 'listthese');
    this.listthese=res;
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
      this.stagaireservice.supprimerstagaire(id).subscribe(res => {
        this.getstagaire();
      });
      Swal.fire(
        'Suprimer!',
        this.stagairee.nomutilisateur + '' + this.stagairee.prenomutilisateur + '' + 'Bien Supprimer',
        'success'
      );

    }
  });
}

modifstagaire() {
  this.submitmodifstagaire = true;
  const data4 = {
    usernameutilisateur: this.StagaireFormModif.value.usernameutilisateur,
    passwordutilisateur: this.StagaireFormModif.value.passwordutilisateur,
    firstnameutilisateur: this.StagaireFormModif.value.firstnameutilisateur,
    lastnameutilisateur: this.StagaireFormModif.value.lastnameutilisateur,
    nomutilisateur: this.StagaireFormModif.value.nomutilisateur,
    prenomutilisateur: this.StagaireFormModif.value.prenomutilisateur,
    datenaissanceutilisateur: this.StagaireFormModif.value.datenaissanceutilisateur,
    emailutilisateur: this.StagaireFormModif.value.emailutilisateur,
    sexeutilisateur: this.StagaireFormModif.value.sexeutilisateur,
    telephoneutilisateur: this.StagaireFormModif.value.telephoneutilisateur,
    adresseutilisateur: this.StagaireFormModif.value.adresseutilisateur,
    photoutilisateur: this.StagaireFormModif.value.photoutilisateur,
    gradeutilisateur: this.StagaireFormModif.value.gradeutilisateur,

  };
  console.log(data4);

  this.stagaireservice.modifierstagaire(data4,this.stagairee.idutilisateur,this.StagaireFormModif.value.these).subscribe(res => {
    console.log(res);
    console.log('bien modifier');
    this.getstagaire();
    this.submitmodifstagaire=false;
    this.StagaireFormModif.reset();
    window.location.reload();
  });
}

recuper(idutilisateur,usernameutilisateur,passwordutilisateur,firstnameutilisateur,lastnameutilisateur,nomutilisateur,prenomutilisateur,datenaissanceutilisateur,emailutilisateur,sexeutilisateur,telephoneutilisateur, adresseutilisateur,photoutilisateur,gradeutilisateur,these) {
  this.stagairee.idutilisateur            = idutilisateur;
  this.stagairee.usernameutilisateur      = usernameutilisateur;
  this.stagairee.passwordutilisateur      = passwordutilisateur;
  this.stagairee.firstnameutilisateur     = firstnameutilisateur;
  this.stagairee.lastnameutilisateur      = lastnameutilisateur;
  this.stagairee.nomutilisateur           = nomutilisateur;
  this.stagairee.prenomutilisateur        = prenomutilisateur;
  this.stagairee.datenaissanceutilisateur = datenaissanceutilisateur;
  this.stagairee.emailutilisateur         = emailutilisateur;
  this.stagairee.sexeutilisateur          = sexeutilisateur;
  this.stagairee.telephoneutilisateur     = telephoneutilisateur;
  this.stagairee.adresseutilisateur       = adresseutilisateur;
  this.stagairee.photoutilisateur         = photoutilisateur;
  this.stagairee.gradeutilisateur         = gradeutilisateur;
  this.stagairee.these                    = these;


  console.log(idutilisateur,usernameutilisateur,passwordutilisateur,firstnameutilisateur,lastnameutilisateur,nomutilisateur,prenomutilisateur,datenaissanceutilisateur,emailutilisateur,sexeutilisateur,telephoneutilisateur, adresseutilisateur,photoutilisateur,gradeutilisateur,these)
  console.log(this.stagairee);
}

}


