import { TestBed } from '@angular/core/testing';

import { PostService } from './post-service';
import { provideHttpClient } from '@angular/common/http';
import {  provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';



describe('PostService', () => {
  let service: PostService;
  let controller : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(PostService);
    controller = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('it should return data of posts', ()=>{

    const mockPost = [
      {id: 1, user_id: 25, title: 'post di testing 1', body: 'descrizione del post 1 usato per il testing', comment:[]},
      {id: 2, user_id: 26, title: 'post di testing 2', body: 'descrizione del post 2 usato per il testing', comment:[]}

    ];

    service.getPost();


    const resp = controller.expectOne('https://gorest.co.in/public/v2/posts?page=1&per_page=20');
    resp.flush(mockPost);

    service.post$.subscribe(posts =>{
      expect(posts).toEqual(mockPost)
    })
  })
});
