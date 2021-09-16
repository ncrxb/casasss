import { Component, OnInit } from '@angular/core';
import { CasasService } from 'src/app/services/casas.service';
import {Casas} from 'src/app/models/casas';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { HtmlParser } from '@angular/compiler';


declare var M: any;
declare var CanvasJS: any;

@Component({
  selector: 'app-casas',
  templateUrl: './casas.component.html',
  styleUrls: ['./casas.component.css']
})
export class CasasComponent implements OnInit {

  constructor( public casasService: CasasService) { }

  ngOnInit(): void {
    this.getCasas();
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
    }
  }

  addCasa(form?:NgForm){
    if(form){
      if (form.value._id){
        this.casasService.putCasa(form.value).subscribe(res =>{
          this.resetForm(form);
          M.toast({html: 'Casa actualizado exitosamente'});
          this.getCasas();
        });

      }else{
        delete form.value._id;
        this.casasService.postCasa(form.value).subscribe(res =>{
          this.resetForm(form);
          M.toast({html: 'Casa guardado exitosamente'});
          this.getCasas();
        })
      }
    }
  }

  getCasas(){
    this.casasService.getCasas().subscribe(res =>{
      this.casasService.casas = res as Casas[];
    })
  }

  updateCasa(casa: Casas){
    this.casasService.selectedCasa = casa;
  }


  deleteCasa(_id: string){
    if(confirm('Esta seguro de querer eliminar esta casa?')){
      this.casasService.deleteCasa(_id).subscribe(res =>{
        this.getCasas();
        M.toast({html: 'Casa eliminado exitosamente'});
      });
    }
  }

  getCasasByNameAndEmail(){
    var searchvalue = (<HTMLInputElement>document.getElementById("searchfield")).value;
    if (searchvalue != '') {
      var filter = this.casasService.casas.filter(function(value){
        return value.nombre_negocio.toUpperCase().includes(searchvalue.toUpperCase()) ||
        value.email.toUpperCase().includes(searchvalue.toUpperCase()) ;
      });
      this.casasService.casas = filter as Casas[];
    }else{
      this.getCasas();
    }

  }


}

