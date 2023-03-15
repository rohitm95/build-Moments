import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MomentData } from './moment-data';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  feedUrl = 'http://localhost:3000/feed';
  token = localStorage.getItem('token');
  headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.token)
    .set('Access-Control-Allow-Origin', '*');
  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  getPosts() {
    return this.http.get<MomentData>(`${this.feedUrl}/posts`, {
      headers: this.headers,
    });
  }

  deletePost(id: any) {
    return this.http.delete<MomentData>(`${this.feedUrl}/post/${id}`, {
      headers: this.headers,
    });
  }
}
