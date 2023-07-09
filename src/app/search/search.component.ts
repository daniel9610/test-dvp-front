import { Component, OnInit } from '@angular/core';
import { ApiGithubService } from '../services/api-github.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public users:any = [];
  public myForm!:FormGroup;
  nameButton: any;

  constructor(
    private api:ApiGithubService,
    private  formBuilder: FormBuilder,
    ) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(1)]],
     });
  }
  get f() { return this.myForm.controls; }

  onSubmit(){

    const form = this.myForm.value;
    // if(form.parent_id==""){
    //   this.myForm.controls.parent_id.setValue("Na");
    // }
    // console.log(this.myForm.controls.parent_id)

    if(this.myForm.valid){
      this.nameButton = 'Enviando';
      this.api.getUsersForUsername('users?q=', form.username).subscribe(
          result => {
        console.log(result);

    //         if(result){
    //           Swal.fire({
    //             title: 'Vehículo registrado exitosamente',
    //             showConfirmButton: true,
    //             confirmButtonText: 'Entendido',
    //             confirmButtonColor: '#008000'
    //           });
    //           this.myForm.reset();
    //         }
    //       },
    //       error => {
    //         Swal.fire({
    //           title: 'Error API.'
    //         });
    //       });
    //   this.nameButton = 'Enviar';
    // }else if(this.myForm.invalid){
    //   console.log(this.myForm);
    //   Swal.fire({
    //     title: 'Formulario inválido',
    //     text: 'Diligencie todos los campos del formulario',
    //     cancelButtonText: 'Ok'
      });
    }
  }

  getUsers( username:string ){
    console.log(username);
    this.api.getUsersForUsername('users?q=', username).subscribe(
      (result:any) => {
        if(result){
          this.users = [];
          for(let i=0;i<result.length;i++){
            this.users.push(result[i]);
          }
        }
      },
    );
  }
}
