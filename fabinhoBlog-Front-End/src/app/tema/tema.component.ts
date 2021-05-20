import { AlertasService } from './../service/alertas.service';
import { TemaService } from './../service/tema.service';
import { Tema } from './../model/Tema';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    if(environment.token == ""){
      this.alertas.showAlertInfo("Sua seção expirou, faça login novamente")
      this.router.navigate(["/login"])
    }

    if (environment.tipo != "adm"){
      this.alertas.showAlertInfo("Acesso restrito a administradores")
      this.router.navigate(["/home"])
    }
    this.findAllTemas()

  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) =>{
      this.listaTemas = resp
    })
  }

  cadastrar(){
    this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp
      this.alertas.showAlertSuccess("Tema cadastrado com sucesso!")
      this.findAllTemas()
      this.tema = new Tema()
    })
  }



}
