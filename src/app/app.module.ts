import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AgmCoreModule } from "angular2-google-maps/core";
import { InscriptionFormComponent } from './inscription-form/inscription-form.component';
import {InscriptionFormService} from './inscription-form/inscription-form.service';
import { FillAddressComponent } from './fill-address/fill-address.component';
import { RecaptchaModule } from 'ng2-recaptcha';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
    // { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: LandingPageComponent },
    { path: 'fillAddress', component: FillAddressComponent },
     { path: 'success', component: SuccessComponent }
    //  { path: 'contact', component: ContactComponent },
    //{ path: 'contactus', redirectTo: 'contact' },
];

@NgModule({
    declarations: [
        AppComponent,
        LandingPageComponent,
        InscriptionFormComponent,
        FillAddressComponent,
        SuccessComponent
    ],
    imports: [
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyD-VVxAdWzbH13CuOB8FbrfL4UpH9my1EQ",
            libraries: ["places"],
            
        }),
        BrowserModule,
        FormsModule,
        HttpModule,
        Ng2AutoCompleteModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        RecaptchaModule.forRoot(),
    ],
    providers: [InscriptionFormService, FormBuilder],
    bootstrap: [AppComponent]
})


export class AppModule { }
