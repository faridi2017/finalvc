import { Component, OnInit } from '@angular/core';
import { UserLeads } from '../modal/userLeads';
import { VictorServiceService } from '../apiService/victor-service.service';
import {throwError} from 'rxjs';
import { Routes, Router } from '../../../node_modules/@angular/router';
@Component({
  selector: 'app-vcnavigation',
  templateUrl: './vcnavigation.component.html',
  styleUrls: ['./vcnavigation.component.css']
})
export class VcnavigationComponent implements OnInit {
leadsCount:UserLeads;
vedagya19 = false;
show=false;
public user;
  constructor(private getCounts:VictorServiceService,private router:Router) {
    this.user =sessionStorage.getItem('userName');
    
    //this.vedagya19 = sessionStorage.getItem('roleId');
   }

  ngOnInit() {
    if(sessionStorage.getItem('roleId') == '1'){
        this.vedagya19 = true;

    }else{ this.vedagya19 = false;}
    this.getCounts.getDetails(sessionStorage.getItem('userName')).subscribe((data: UserLeads) => {
    this.leadsCount = data;
   // this.user =sessionStorage.getItem('userName');
    console.log('Aarif1');
   // console.log(this.leadsCount);
    return true;
  },
  error => {
    console.error("Error in Api!");
    return throwError(error);  // Angular 6/RxJS 6
  }
);
  }
  homenavigate(){
    console.log('hello')
this.router.navigate['admin'];

  }
  logOut() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  showHide(){
    this.show=!this.show;
  }

}
