import { RenderingService } from '../utils/rendering-service';
import { FormControl } from "@angular/forms";
import { NgZone, Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader } from 'angular2-google-maps/core';
import {InscriptionFormService} from '../inscription-form/inscription-form.service';
import { Inject } from '@angular/core';
import {Router} from '@angular/router';

@Component( {
    selector: 'app-fill-address',
    templateUrl: './fill-address.component.html',
    styleUrls: ['./fill-address.component.css'],
    providers: [RenderingService]
})
export class FillAddressComponent implements OnInit {

    public searchControl: FormControl;
    public latitude: number;
    public longitude: number;
    public adress : string;

    public zoom: number;
    inscriptionService: InscriptionFormService;

    @ViewChild( "search" )
    public searchElementRef: ElementRef;

    constructor( private renderingService: RenderingService,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private service: InscriptionFormService,
        private router: Router) {
        this.renderingService.show = false;
        this.inscriptionService = service;
    }

    ngOnInit() {
        
       
        //set google maps defaults
        this.zoom = 4;
        this.latitude = 48,8589;
        this.longitude = 2,2945;

        //create search FormControl
        this.searchControl = new FormControl();

        //set current position
        this.setCurrentPosition();

        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete( this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener( "place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    //verify result
                    if ( place.geometry === undefined || place.geometry === null ) {
                        return;
                    }

                    //set latitude, longitude and zoom
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.zoom = 12;
                });
            });
        });
    }

    private setCurrentPosition() {
        if ( "geolocation" in navigator ) {
            
            var options = {
                    enableHighAccuracy: true
                  };
            navigator.geolocation.getCurrentPosition(( position ) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 12;
                let geocoder = new google.maps.Geocoder();
                let latlng = new google.maps.LatLng(this.latitude, this.longitude);
                let request = {
                  latLng: latlng
                };   
                

                  geocoder.geocode(request, (results, status) => {
                    if (status == google.maps.GeocoderStatus.OK) {
                      if (results[0] != null) {
                       let city = results[0].address_components[results[0].address_components.length-4].short_name;                      

                   console.log(results[0].formatted_address);
                   console.log('prospect lng', this.longitude);
                   console.log('prospect lng', this.latitude);
                   this.adress = results[0].formatted_address;


                      } else {
                        alert("No address available");
                      }
                    }
                  });

              }, error => {
                console.log(error);
              }, options);
          };
        }
    
    
    onSubmit(): void {
     
        let prospect  = this.inscriptionService.getProspect();
        prospect.setAdress(this.adress);
        prospect.setLongitude(this.longitude);
        prospect.setLatitude(this.latitude);
        console.log('prospect infos', prospect);
        
        this.inscriptionService.makePost(JSON.stringify({prospect}),'create');
        this.router.navigate(['success']);
        
    }

}
   
