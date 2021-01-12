import { Membre } from './../model/membre';
import { ArticleService } from './../service/article.service';
import { MembreService } from './../service/membre.service';
import {Router} from "@angular/router";
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Article } from '../model/article';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

// Début Boucle class

export class ArticleComponent implements OnInit {
  articleForme: FormGroup;
  articleModifForme: FormGroup;
  articlesubmited    = false;
  articlesubmitmodif = false;
  listmembre;
  listarticle;
  idarticle;
  articlee = new Article();

  constructor(private formbuilder: FormBuilder,private router : Router,private membreservice: MembreService , private articleservice: ArticleService ) { }

  // ngOnInit <-> Début Boucle

  ngOnInit() {
    this.getarticle();
    this.getmembre();

// Partie Ajouter Article

this.articleForme = this.formbuilder.group({
  titrearticle: ['',Validators.required],
  descriptionarticle : ['',Validators.required],
  sujetarticle : ['',Validators.required],
  etatarticle :  ['',Validators.required],
  membre :  ['',Validators.required],
});

// Partie Modifier Article

this.articleModifForme = this.formbuilder.group({
  titrearticle: ['',Validators.required],
  descriptionarticle : ['',Validators.required],
  sujetarticle : ['',Validators.required],
  etatarticle :  ['',Validators.required],
  membre :  ['',Validators.required],
});

}

// ngOnInit <-> Fin Boucle

// Fonction Ajouter Article

get fonctionajouterarticle() {

  return this.articleForme.controls;

}

// Fonction Modifier Article

get fonctionmodifierarticle() {

  return this.articleModifForme.controls;

}

// Fonction détaillée Ajouter Article

AjouterArticle() {
this.articlesubmited = true;
const data3 = {

  titrearticle: this.articleForme.value["titrearticle"],
  descriptionarticle: this.articleForme.value["descriptionarticle"],
  sujetarticle: this.articleForme.value["sujetarticle"],
  etatarticle: this.articleForme.value["etatarticle"]
};
this.articleservice.article(data3, this.articleForme.value.membre).subscribe(res1 => {
console.log(res1);
window.location.reload();
});
}

// Fonction détaillée pour modifier un Article

ModifierArticle() {
  this.articlesubmitmodif = true;
  const data4 = {
    titrearticle: this.articleModifForme.value["titrearticle"],
    descriptionarticle: this.articleModifForme.value["descriptionarticle"],
    sujetarticle: this.articleModifForme.value["sujetarticle"],
    etatarticle: this.articleModifForme.value["etatarticle"]

  };
  console.log(data4);
  this.articleservice.modifierarticle(data4, this.articlee.idarticle, this.articleModifForme.value.membre).subscribe(res => {
    console.log(res);
    console.log('Bien Modifier');
    this.getarticle();
    this.articlesubmitmodif = false;
    this.articleModifForme.reset();
    window.location.reload();
  });
}

// Fonction détaillée pour supprimer un Article

DeleteArticle(id) {
  Swal.fire({

    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui,Supprimer!'
  }).then((result) => {
    if (result.value) {
      this.articleservice.supprimerarticle(id).subscribe(res => {
        this.getarticle();
      });
      Swal.fire(
        'Supprimer!' ,
        this.articlee.titrearticle + ' ' + 'Bien Supprimer' ,
        'success'
        );
      }
    });
  }

  // Fonction détaillée pour récupérer les Articles

  recuper(idarticle, titrearticle, descriptionarticle, sujetarticle, etatarticle, membre) {

    this.articlee.idarticle = idarticle;
    this.articlee.titrearticle = titrearticle;
    this.articlee.descriptionarticle = descriptionarticle;
    this.articlee.sujetarticle = sujetarticle;
    this.articlee.etatarticle = etatarticle;
    this.articlee.membre = membre;

    console.log(idarticle, titrearticle, descriptionarticle, sujetarticle, etatarticle, membre)
    console.log(this.articlee);


  }

  // Afficher Liste des articles
  getarticle() {
    this.articleservice.getallarticle().subscribe(res=>{
      console.log(res);
      this.listarticle = res;
    })
  }

  // Afficher Liste des membres
  getmembre() {
    this.membreservice.getallmembre().subscribe(res=>{
      console.log(res);
      this.listmembre = res;
    })
  }

  // La fonction Valider
  valider(id){
    this.articleservice.valider(id).subscribe(res=>{
      console.log(res);
      this.getarticle();
    })
  }
}

// Fin Boucle class

