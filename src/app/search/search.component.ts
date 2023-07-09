import { Component, OnInit } from '@angular/core';
import { ApiGithubService } from '../services/api-github.service';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public users:any = [];
  public myForm!:FormGroup;
  nameButton: any;
  forbiddenValues:string[] = ['doublevpartners', 'hola'];
  errors:any;
  chart: any;
  chart_data:any = { "user": 10,
                      "user2":20,
                      "user3":30,
                      "user4":12,
                      "user5":40,
                      "user6":13,
                      "user7":15,
                      "user8":2,
                      "user9":4,
                      "user10":5
                   };

  constructor(
    private api:ApiGithubService,
    private  formBuilder: FormBuilder,
    ) { }

  ngOnInit() {
    // console.log(this.users);
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), this.isForbidden(this.forbiddenValues)]],
     });


      
  }
  get f() { return this.myForm.controls; }
  

  onSubmit(){

    const form = this.myForm.value;
    if(this.myForm.valid){
      this.createChart();
      this.nameButton = 'Enviando';
      this.api.getUsersForUsername('search/users?q=', form.username).subscribe(
          (result:any) => {
        // console.log(result.items);

        if(result){
          this.users = [];
          for(let i=0;i<result.items.length;i++){
            this.users.push(result.items[i]);
          }
  
          // console.log(this.users);

        }
      });
    }else if(this.myForm.invalid){
        // console.log(this.myForm);
        Swal.fire({
          title: 'Formulario inválido',
          text: 'Valores de búsqueda inválidos',
          cancelButtonText: 'Ok'
        });
    }
    
  }

  cleanUsers(){
    if(this.users.length > 0 ){
      this.users = [];
      this.myForm.reset();
      this.chart.destroy();
    }
  }

  isForbidden(forbiddenValues: string[]): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (forbiddenValues.indexOf(c.value) !== -1) {
        return { 'forbiddenValues': true };
      }
      return null;
    };
  }

  searchError(){
    this.errors = this.myForm.controls['username'].errors;
    // console.log(this.errors.hasOwnProperty('minlength'));
  }

  createChart(){
    this.users
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart
      data: {
        datasets: [{
          label:'Followers',
          data: this.chart_data,
        }]
      },
      options: {
        aspectRatio:2.5
      }
    });
  }
}
