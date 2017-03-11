import { Component, OnInit } from '@angular/core';
import {InscriptionFormService} from './inscription-form.service';
import {Serializable} from '../utils/serializable';
import {Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-inscription-form',
    templateUrl: './inscription-form.component.html',
    styleUrls: ['./inscription-form.component.css'],
   
})

export class InscriptionFormComponent implements OnInit {

    loading: boolean;
    inscriptionService: InscriptionFormService;
    recaptchaSuccess: boolean;
    prospect = new Prospect();
    inscriptionForm : FormGroup;

    constructor(private service: InscriptionFormService, private router: Router, fb : FormBuilder) {
        this.inscriptionService = service;
        
        this.inscriptionForm = fb.group({ 'firstName' : [null, Validators.required],
                'lastName': [null, Validators.required],
                'email':[null,  Validators.compose([Validators.required,Validators.pattern("/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i")])],
                'newsLetter':true});
    }

    ngOnInit() {
        this.prospect.newsLetter = true;
    }

    onSubmit(): void {

        if (this.recaptchaSuccess) {
            this.loading = true;
            let prospect = this.prospect;
            let prospectService = this.inscriptionService.getProspect();
            prospectService.setFirstName(prospect.firstName);
            prospectService.setLastName(prospect.lastName);
            prospectService.setEmail(prospect.email);
            prospectService.setNewsLetter( prospect.newsLetter);
            console.log('you submitted value:', prospectService);
            
            this.router.navigate(['fillAddress']);
        }
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response ${captchaResponse}:`);
        if (captchaResponse.length === 0) {
            this.recaptchaSuccess = false;
        }
        else {
            this.recaptchaSuccess = true;
        }
    }

}



class Prospect  {
    firstName: string;
    lastName: string;
    email: string;
    newsLetter: boolean;

}


