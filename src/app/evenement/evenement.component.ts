import { EvenementService } from './../service/evenement.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Evenement } from '../model/evenement';
import { AdminService } from '../service/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent implements OnInit {

  evenementform : FormGroup;
  evenementmodifform : FormGroup;
  submitedevenement    = false;
  submitedmodifevenement = false;
  listevenement;
  listadmin;
  idevenement;
  evenemente = new Evenement();

  constructor(private formbuilder:FormBuilder,private router:Router,private adminservice:AdminService,private evenementservice:EvenementService) { }

  ngOnInit() {
    this.getevenement();
    this.getadmin();

    // Partie Ajouter Evenement
this.evenementform = this.formbuilder.group({

  nomevenemnt: ['', Validators.required],
  dateevenemnt: ['', Validators.required],
  lieuevenemt: ['', Validators.required],
  administrateur: ['', Validators.required],

});

   // Partie Modifier Evenement
this.evenementmodifform = this.formbuilder.group({
  nomevenemnt: ['', Validators.required],
  dateevenemnt: ['', Validators.required],
  lieuevenemt: ['', Validators.required],
  administrateur: ['', Validators.required],
})
}

get evenementform1() {
  return this.evenementform.controls;
}
get evenementmodifform1() {
  return this.evenementmodifform.controls;
}

// Evenement

evenement() {
  this.submitedevenement = true;
  const data3 = {
    nomevenemnt: this.evenementform.value["nomevenemnt"],
    dateevenemnt: this.evenementform.value["dateevenemnt"],
    lieuevenemt: this.evenementform.value["lieuevenemt"]

  };

  this.evenementservice.evenement(data3,this.evenementform.value.administrateur).subscribe(res1 => {
    console.log(res1);
   /* this.router.navigate(['these']);*/
   window.location.reload();

  });
}

// Afficher les equipes
getadmin(){
  this.adminservice.getalladmin().subscribe(res=>{
    console.log(res);
    this.listadmin=res;
  })
}

// Afficher les évenements
getevenement(){
  this.evenementservice.getallevenement().subscribe(res=>{
    console.log(res, 'listevenement');
    this.listevenement=res;
  })
}

delete(id) {
  Swal.fire({



    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, Supprimer!'
  }).then((result) => {
    if (result.value) {

      this.evenementservice.supprimerevenement(id).subscribe(res => {
        this.getevenement();
      });
      Swal.fire(
        'Suprimer!',
        this.evenemente.nomevenemnt + '' + 'Bien Supprimer',
        'success'
      );

    }
  });
}

modifevenement() {
  this.submitedmodifevenement = true;

  const data4 = {


    nomevenemnt: this.evenementmodifform.value.nomevenemnt,
    dateevenemnt: this.evenementmodifform.value.dateevenemnt,
    lieuevenemt: this.evenementmodifform.value.lieuevenemt

  };
  console.log(data4);

  this.evenementservice.modifierevenement(data4,this.evenemente.idevenemnt,this.evenementmodifform.value.administrateur).subscribe(res => {
    console.log(res);
    /*if (this.filesToUpload !== undefined) {

      this.imsr.pushFileToStorage(this.filesToUpload[0]).subscribe(rest => {
        console.log(rest);
      });
    }*/
    console.log('bien modifier');
    this.getevenement();
    this.submitedmodifevenement=false;
    this.evenementmodifform.reset();
    window.location.reload();
  });


}

recuper(idevenemnt, nomevenemnt, dateevenemnt, lieuevenemt, administrateur) {
  this.evenemente.idevenemnt = idevenemnt;
  this.evenemente.nomevenemnt = nomevenemnt;
  this.evenemente.dateevenemnt = dateevenemnt;
  this.evenemente.lieuevenemt = lieuevenemt;
  this.evenemente.administrateur = administrateur;

  console.log(idevenemnt, nomevenemnt, dateevenemnt, lieuevenemt, administrateur)
  console.log(this.evenemente);
}



}
