import { TestBed } from '@angular/core/testing';

import { UsersService } from './users-service';
import { provideHttpClient } from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing'
import { HttpTestingController } from '@angular/common/http/testing';

describe('UsersService', () => {
  let service: UsersService;
  let controller : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(UsersService);
    controller = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  
  });


  it('it should return data of users ', () =>{
     // 1. dati finti che simulano gli users
    const mockUsers = [
       {id:1 , name: 'Gloria', email: 'gloria@test.com', gender: 'female', status: 'active'},
       {id:2 , name: 'Mario', email: 'mario@test.com', gender: 'male', status: 'inactive'}

    ];

     // chiamare metodo
     service.getUser();


     //intercettare la richiesta http
     const resp = controller.expectOne('https://gorest.co.in/public/v2/users?page=1&per_page=30');
     resp.flush(mockUsers) // risposta da ricevere

     //verificare che users$ contenga i dati(mockUsers)
     service.users$.subscribe( users => {
       expect(users).toEqual(mockUsers)
     })

  })
});
