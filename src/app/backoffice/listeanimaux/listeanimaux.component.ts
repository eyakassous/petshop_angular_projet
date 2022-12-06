import { Animal } from './../../frontoffice/modelfront/animal';
import { Component, OnInit } from '@angular/core';
import { ServiceadmnService } from '../ServiceAdmin/serviceadmn.service';

@Component({ 
  selector: 'app-listeanimaux',
  templateUrl: './listeanimaux.component.html',
  styleUrls: ['./listeanimaux.component.css']
})
export class ListeanimauxComponent implements OnInit {
  lesanimaux!:Animal[];
  searchText: string = '';
 
  constructor(private servadmin:ServiceadmnService) { }

  ngOnInit(): void {
    this.servadmin.getAnimals().subscribe (data => this.lesanimaux = data)
  
  }
  supprimer(anim: Animal) {
    this.servadmin.supprimeranim(anim.id)
      .subscribe(
        (data) => (this.lesanimaux = this.lesanimaux.filter((e) => e.id != anim.id))
      );
  }
  onSearchTextentered(searchvalue: string){
    this.searchText=searchvalue;
    //console.log(this.searchText);
  }
  

}

