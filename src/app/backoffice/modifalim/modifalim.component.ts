import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Alimentation } from 'src/app/Model/alimentation';
import { ServiceadmnService } from '../ServiceAdmin/serviceadmn.service';

@Component({
  selector: 'app-modifalim',
  templateUrl: './modifalim.component.html',
  styleUrls: ['./modifalim.component.css']
})
export class ModifalimComponent implements OnInit {
  prodForm!:FormGroup;
  lesalim!:Alimentation[];
  message!: string;
  idProduit: any;
  constructor(private form:FormBuilder,private servadmin:ServiceadmnService,private router:Router,private activatetRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.prodForm = this.form.nonNullable.group({
      libelle:['',[Validators.required, Validators.pattern('^[A-Z][a-zA-Z]+$')]],
      prix:[0,[Validators.required, Validators.pattern('^[0-9]+$')]],
      photo:['',Validators.required],
     datefabriquation:['',Validators.required],
      datefin:['',Validators.required],

    })
    this.idProduit = this.activatetRoute.snapshot.params['id'];
  }
  Ajouter() {
    this.servadmin.ajouteralim(this.prodForm.value).subscribe(data=>this.lesalim.push(data));
    this.router.navigate(['admin/dashbord/liste']);
    this.message="Ajout fait avec succes";
  }

}
