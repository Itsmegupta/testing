import { Injectable } from '@angular/core';
import {Observable,BehaviorSubject} from 'rxjs';
import { HttpClient , HttpHeaders , } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  environment='http://localhost:5000/'
  constructor(private httpClient:HttpClient) { }

  registerSubmit(register:any){
    console.log("Working COmmon Service",register)
    return this.httpClient.post(this.environment+'register/registrationSubmitData', (register))
  }

  loginUser(login:any){
    console.log(login);
    return this.httpClient.post(this.environment+'login/loginUser', (login))
  }

  getUserData(){
    return this.httpClient.get(this.environment+'register/getUserData')
  }

  deleteUser(id:any){
    console.log(id);
    
    return this.httpClient.post(this.environment+'register/deleteUser',{id:id})
  }

  editUser(id:any){
    return this.httpClient.post(this.environment+'edit/editUser',{id:id})
  }

  updateUser(selectedId:any,editform:any){
    console.log("common update");
    
    return this.httpClient.post(this.environment+'edit/updateUser',{selectedId:selectedId,editform:editform})
  }

  uploadProfilePic(value:any){
    return this.httpClient.post(this.environment+'uploadImage',value)
  }

  updateProfilePic(value:any){
    return this.httpClient.post(this.environment+'register/updateUser',value)
  }
}