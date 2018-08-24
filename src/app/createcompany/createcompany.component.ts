import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Company } from '../modal/company';
import { VictorServiceService } from '../apiService/victor-service.service';
import { FormGroup, FormControl , Validators } from '@angular/forms';
@Component({
  selector: 'app-createcompany',
  templateUrl: './createcompany.component.html',
  styleUrls: ['./createcompany.component.css']
})
export class CreatecompanyComponent implements OnInit {
  createCompanyForm;
  cpB=false;
  loading=false;
  //cpB=flase
  companyName="";
  email="";
  phone="";
  contactPersonName="";
  contactEmail="";
  emailB=false;
  country="";
  state="";
  city="";
  companyAddress="";
  contactPhone="";
  activation="";
 company:Company;
  constructor(private router: Router, private cmpService: VictorServiceService,
  private spinner:NgxSpinnerService) { 
    this.company = new Company();
    this.createCompanyForm=new FormGroup({
      'companyName':new FormControl('',Validators.compose([Validators.required])),
      'email':new FormControl('',Validators.compose([Validators.required])),
      'phone':new FormControl('',Validators.compose([Validators.required])),
      'contactPersonName':new FormControl('',Validators.compose([Validators.required])),
      'contactEmail':new FormControl('',Validators.compose([Validators.required])),
      'country':new FormControl('',Validators.compose([Validators.required])),
      'state':new FormControl('',Validators.compose([Validators.required])),
      'city':new FormControl('',Validators.compose([Validators.required])),
      'companyAddress':new FormControl('',Validators.compose([Validators.required])),
      'contactPhone':new FormControl('',Validators.compose([Validators.required])),
      'activation':new FormControl('',Validators.compose([Validators.required])),
    });
  }

  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();
 
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 1000);
  }
 
  createCompany(createCompanyForm){
    this.companyName=createCompanyForm.companyName;
    this.email=createCompanyForm.email;
    this.phone=createCompanyForm.phone;
    this.contactPersonName=createCompanyForm.contactPersonName;
    this.country=createCompanyForm.country;
    this.companyAddress=createCompanyForm.companyAddress;
    this.contactPhone=createCompanyForm.contactPhone;
    this.activation=createCompanyForm.activation;
    this.contactEmail=createCompanyForm.contactEmail;
    this.state=createCompanyForm.state;
    this.city=createCompanyForm.city;

    if(this.companyName.length===0||this.email.length===0||
      this.phone.length===0||this.contactPersonName.length===0||
      this.country.length===0||this.companyAddress.length===0||
      this.contactPhone.length===0||this.activation.length===0||
      this.contactEmail.length===0||this.state.length===0||this.city.length===0){
      console.log(this.companyName,this.email,this.phone,
        this.contactPersonName,this.country,this.contactPhone,this.activation,
        this.activation,this.contactEmail,this.state,this.city);
        alert('Please Fill All Filed');
        return;
    }else{
      this.company.activatedTill ="2020-05-01T08:30:00";
      console.log(this.company);
      this.loading=true;
    this.cmpService.postAddCompany(this.company).subscribe((res:any)=>{
      
      console.log(res);
   this.loading=false;
      alert('Company Added Successfully');

      this.router.navigateByUrl('/superadmin/manageCompanies');
    });
    //alert('Form Submitted');
    }
    
     }
  cancelCompany(){
    console.log('Data Cancel');
    this.router.navigate(['/superadmin/manageCompanies']);
  }
  validateEmail(){
    console.log('validate email');
    let rex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //return re.test(email);
    //  this.emailB = rex.test(this.company.email);
      if(rex.test(this.company.email)==false){
          this.emailB = true;
      }else{
        this.emailB = false;
      }
    //  console.log('email:', this.company.email);
      //console.log('email validate:',this.emailB);
  }
  validateCpName(){
    console.log(this.company.contactPersonName);
    let rex = /^[a-zA-Z ]{2,50}$/; // START WITH a-zA-z, end with a-z, min length 2, max len 30
    if(rex.test(this.company.contactPersonName)==false){
      this.cpB = true;
  }else{
    this.cpB = false;
  }
  }

}
