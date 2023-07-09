import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiGithubService } from '../services/api-github.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy{
  private sub: any;
  public username!: string;
  public user_data:any = [];

  constructor(
    private api:ApiGithubService,
    private route: ActivatedRoute
  ) {}


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
    this.username = params['user_login'];
    this.api.getUserDetails('users/', this.username).subscribe(
      (result:any) => {
          if(result){
            this.user_data = result;
            // console.log(this.user_data);
          }
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
