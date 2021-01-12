import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Equipe } from '../model/equipe';
import { EquipeService } from '../service/equipe.service';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent implements OnInit {

  equipeForm : FormGroup;
  equipemodifForme: FormGroup;
  equipesubmited    = false;
  equipesubmitmodif = false;
  listequipe;
  idequipe;
  equipee = new Equipe();
  /*modalRef: BsModalRef;*/

  constructor(private formbuilder: FormBuilder, private router: Router,
  private equipeservice:EquipeService) {}

  ngOnInit() {
    this.getequipe();

    // Partie Equipe

      this.equipeForm = this.formbuilder.group({
        nomequipe: ['', Validators.required],
        specialiteequipe: ['', Validators.required],
      });

// Partie Modifier Equipe

      this.equipemodifForme = this.formbuilder.group({
        nomequipe: ['', Validators.required],
        specialiteequipe: ['', Validators.required],
      });
    }


    get fctajoutequipe() {
      return this.equipeForm.controls;
    }
    get fctmodifequipe() {
      return this.equipemodifForme.controls;
    }


// Equipe !!

equipe() {
  this.equipesubmited = true;
  const data3 = {
    nomequipe: this.equipeForm.value["nomequipe"],
    specialiteequipe: this.equipeForm.value["specialiteequipe"]
  };

  this.equipeservice.equipe(data3).subscribe(res1 => {
    console.log(res1);
     window.location.reload();
    });
}

// Afficher les equipes

getequipe(){
  this.equipeservice.getallequipe().subscribe(res=>{
    console.log(res, 'listequipe');
    this.listequipe=res;
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

      this.equipeservice.supprimerequipe(id).subscribe(res => {
        this.getequipe();
      });
      Swal.fire(
        'Suprimer!',
        this.equipee.nomequipe + '' + 'Bien Supprimer',
        'success'
      );

    }
  });
}

modifequipe() {
  this.equipesubmitmodif = true;
  const data4 = {
    nomequipe: this.equipemodifForme.value.nomequipe,
    specialiteequipe: this.equipemodifForme.value.specialiteequipe
  };
  console.log(data4);
  this.equipeservice.modifierequipe(data4,this.equipee.idequipe).subscribe(res => {
    console.log(res);
    console.log('bien modifier');
    this.getequipe();
    this.equipesubmitmodif=false;
    this.equipemodifForme.reset();
    window.location.reload();
  });
}

recuper(idequipe, nomequipe, specialiteequipe) {
  this.equipee.idequipe = idequipe;
  this.equipee.nomequipe = nomequipe;
  this.equipee.specialiteequipe = specialiteequipe;
  console.log(idequipe, nomequipe, specialiteequipe);
  console.log(this.equipee);
}

}
