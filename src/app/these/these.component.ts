import { EquipeService } from './../service/equipe.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TheseService} from "../service/these.service";
import Swal from 'sweetalert2';
import {These} from '../model/these';
/*import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';*/

@Component({
  selector: 'app-these',
  templateUrl: './these.component.html',
  styleUrls: ['./these.component.css']
})
export class TheseComponent implements OnInit {
  theseForm : FormGroup;
  modifForme: FormGroup;
  submited    = false;
  submitmodif = false;
  listequipe;
  listthese;
  idthese;
  thesee = new These();
  /*modalRef: BsModalRef;*/

  constructor(private formbuilder: FormBuilder, private router: Router,
    private theseservice:TheseService,private equipeservice:EquipeService) {

     }

  ngOnInit() {
    this.getequipe();
    this.getthese();
    // Partie These
      this.theseForm = this.formbuilder.group({
        titrethese: ['', Validators.required],
        sujetthese: ['', Validators.required],
        etatthese: ['', Validators.required],
        equipe : ['', Validators.required],
      });

// Partie Modifier These
      this.modifForme = this.formbuilder.group({
        titrethese: ['', Validators.required],
        sujetthese: ['', Validators.required],
        etatthese: ['', Validators.required],
        equipe : ['', Validators.required],
      });
    }


    get f2() {
      return this.theseForm.controls;
    }
    get fmodif() {
      return this.modifForme.controls;
    }
    /*openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
    }*/

// Thèse !!

these() {
  this.submited = true;
  const data3 = {
    titrethese: this.theseForm.value["titrethese"],
    sujetthese: this.theseForm.value["sujetthese"],
    etatthese: this.theseForm.value["etatthese"]

  };

  this.theseservice.these(data3,this.theseForm.value.equipe).subscribe(res1 => {
    console.log(res1);
   /* this.router.navigate(['these']);*/
   window.location.reload();

  });
}
// Afficher les equipes
getequipe(){
  this.equipeservice.getallequipe().subscribe(res=>{
    console.log(res);
    this.listequipe=res;
  })
}


// Afficher les thèses
getthese(){
  this.theseservice.getall().subscribe(res=>{
    console.log(res, 'listthese');
    this.listthese=res;
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

      this.theseservice.supprimerthese(id).subscribe(res => {
        this.getthese();
      });
      Swal.fire(
        'Suprimer!',
        this.thesee.titrethese + '' + 'Bien Supprimer',
        'success'
      );

    }
  });
}

modifthese() {
  this.submitmodif = true;

  const data4 = {


    titrethese: this.modifForme.value.titrethese,
    sujetthese: this.modifForme.value.sujetthese,
    etatthese: this.modifForme.value.etatthese

  };
  console.log(data4);

  this.theseservice.modifierthese(data4,this.thesee.idthese,this.modifForme.value.equipe).subscribe(res => {
    console.log(res);
    /*if (this.filesToUpload !== undefined) {

      this.imsr.pushFileToStorage(this.filesToUpload[0]).subscribe(rest => {
        console.log(rest);
      });
    }*/
    console.log('bien modifier');
    this.getthese();
    this.submitmodif=false;
    this.modifForme.reset();
    window.location.reload();
  });


}

recuper(idthese, titrethese, sujetthese, etatthese, equipe) {
  this.thesee.idthese = idthese;
  this.thesee.titrethese = titrethese;
  this.thesee.sujetthese = sujetthese;
  this.thesee.etatthese = etatthese;
  this.thesee.equipe = equipe;

  console.log(idthese, titrethese, sujetthese, etatthese, equipe)
  console.log(this.thesee);
}


}
