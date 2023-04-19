import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FeedService } from './feed.service';
import { MomentData } from './moment-data';

describe('FeedService', () => {
  let service: FeedService;
  let httpMock: HttpTestingController;
  let toastr: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot()],
      providers: [FeedService],
    });
    service = TestBed.inject(FeedService);
    httpMock = TestBed.inject(HttpTestingController);
    toastr = TestBed.inject(ToastrService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // describe('getPosts()', () => {
  //   it('should get posts from the server', () => {
  //     const posts: MomentData[] = [{ title: 'Post 1', tags: [], image: '' }];
  //     service.getPosts().subscribe((response) => {
  //       expect(response).toEqual(true);
  //     });
  //     const req = httpMock.expectOne(${service.feedUrl}/posts);
  //     expect(req.request.method).toBe('GET');
  //     req.flush(posts);
  //   });
  // });

  // describe('deletePost()', () => {
  //   it('should delete post from the server', () => {
  //     const postId: any = service.deletePost(postId).subscribe((response) => {
  //       expect(response).toBeTruthy();
  //     });
  //     const req = httpMock.expectOne(${service.feedUrl}/post/${postId});
  //     expect(req.request.method).toBe('DELETE');
  //     req.flush({});
  //   });
  // });
});
