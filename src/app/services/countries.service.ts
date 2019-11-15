import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models/country';
import { City } from '../models/city';
import { BaseURI } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  constructor(private httpClient: HttpClient) {
  }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(BaseURI + "countries", { responseType: "json" });
  }
  getCities(id): Observable<City[]> {
    return this.httpClient.get<City[]>(BaseURI + "cities/" + id, { responseType: "json" });
  }
}
