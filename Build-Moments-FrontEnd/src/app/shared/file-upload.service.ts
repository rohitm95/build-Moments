import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpHeaders,
  HttpParams,
  HttpRequest,
  HttpClient,
} from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) {}
  getpresignedurls(
    logNamespace: string | number | boolean,
    fileType: string | number | boolean
  ) {
    let getheaders = new HttpHeaders().set('Accept', 'application/json');
    let params = new HttpParams()
      .set('fileName', logNamespace)
      .set('fileType', fileType);
    return this.http.get<any>('http://localhost:3000/generatepresignedurl', {
      params: params,
      headers: getheaders,
    });
  }

  uploadfileAWSS3(fileuploadurl: string, contenttype: any, file: any) {
    const headers = new HttpHeaders({ 'Content-Type': contenttype });
    const req = new HttpRequest('PUT', fileuploadurl, file, {
      headers: headers,
    });
    return this.http.request(req);
  }
  // addUser(name: string, profileImage: File): Observable<any> {
  //   var formData: any = new FormData();
  //   formData.append('name', name);
  //   formData.append('avatar', profileImage);
  //   return this.http
  //     .post('http://localhost:4000/api/create-user', formData, {
  //       reportProgress: true,
  //       observe: 'events',
  //     })
  //     .pipe(catchError(this.errorMgmt));
  // }
  // errorMgmt(error: HttpErrorResponse) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // Get client-side error
  //     errorMessage = error.error.message;
  //   } else {
  //     // Get server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   console.log(errorMessage);
  //   return throwError(() => {
  //     return errorMessage;
  //   });
  // }
}
