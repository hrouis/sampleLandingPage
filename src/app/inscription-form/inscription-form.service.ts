import {Injectable} from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

@Injectable()
export class InscriptionFormService {
        
    data: Object;
    prospect : Prospect;
    isOn : boolean;

  constructor(private http: Http) {
      this.isOn = true;
      this.prospect = new Prospect();
      }
    
  
  getProspect() : Prospect {
      
      return this.prospect;
  }
  
  setProspect(prospect : Prospect): void {
      this.prospect  = prospect;
  }
    
    /**
     * Post restful request
     * //prospect-subscription/rest/subscription',
     */
     makePost(query: Object, method: string): any {
         
         var headers = new Headers();
         headers.append('Content-Type', 'application/json');
     
         
    this.http.post(
      'http://137.74.195.189:80/magento2/rest/V1/inscription/' + method,   
      query,  {headers: headers})
      .subscribe((res: Response) => {
          console.log('res: ',res.text());
          let body = res.json();
          console.log('body: ',body);
          this.data  = body;
       
      });
    console.log('res2: ',this.data);
    return this.data;
  }
 }


export  class Prospect  {
   
            firstName: string;
            lastName: string;
            email: string;
            newsLetter: boolean;
            adress: string;
            longitude: number;
            latitude: number;
   
    setFirstName ( firstname : string) {this.firstName = firstname}
    setLastName(lastName : string) { this.lastName = lastName}
    setEmail (email : string) { this.email = email}
    setNewsLetter( newsLetter : boolean)  { this.newsLetter = newsLetter}
    setAdress ( adress : string) { this.adress = adress}
    setLongitude ( lng : number)  { this.longitude = lng}
    setLatitude ( ltd : number) {this.latitude = ltd}
    
}