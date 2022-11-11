import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  API_SERVICE = "http://localhost:3000";
  header: HttpHeaders | any

  constructor(private HttpClient: HttpClient) {
    this.header = new HttpHeaders();
    this.header.set('Content-Type', 'application/json')
  }
  get(path: string = '', params = {}) {
    return new Promise((res, rej) => {
      try {
        this.HttpClient.get(this.API_SERVICE + path, { params: params, headers: this.header }).subscribe(ress => {
          res(ress)
        })
      } catch (error) {
        rej(error)
      }
    })

  }
  post(path: string = '', body: any = {}) {
    return new Promise((res, rej) => {
      try {
        this.HttpClient.post(this.API_SERVICE + path, body, { headers: this.header }).subscribe(ress => {
          res(ress)
        })
      } catch (error) {
        alert('Error')
      }
    })
  }
  update(path: string = '', body: any = {}) {
    return new Promise((res, rej) => {
      try {
        this.HttpClient.patch(this.API_SERVICE + path, body, { headers: this.header }).subscribe(ress => {
          res(ress)
        })
      } catch (error) {
        alert('Error')
      }
    })
  }
  delete(path: string = '', params = {}) {
    return new Promise((res, rej) => {
      try {
        this.HttpClient.delete(this.API_SERVICE + path, { params: params, headers: this.header }).subscribe(ress => {
          res(ress)
        })
      } catch (error) {
        rej(error)
      }
    })

  }
}
