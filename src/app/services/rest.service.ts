import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseURI } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private httpClient: HttpClient) { }
  fetch(url): Observable<any> {
    return this.httpClient.get(BaseURI + url);
  }
  post(url, data): Observable<any> {
    debugger;
    return this.httpClient.post(BaseURI + url, data)
  }
  put(url, data): Observable<any> {
    debugger
    return this.httpClient.put(BaseURI + url, data)
  }
  upload(url, data): Observable<any> {
    debugger
    return this.httpClient.post(url, data)
  }
  updateimages(id, fileToUpload: File) {
    debugger
    var url = BaseURI + "CarsProduct/UploadFile/" + id;
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    return this.httpClient.post(url, formData);
  }
}

