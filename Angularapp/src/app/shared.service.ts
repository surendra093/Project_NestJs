import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

import {Opening} from './shared/opening.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class SharedService {

  constructor(private http: HttpClient){ }
  
  public _refreshNeeded$ : BehaviorSubject<any> = new BehaviorSubject(null);

  get refreshNeeded$(){
       return this._refreshNeeded$;
  }

  getOpenings(): Observable<Opening[]>{

      return this.http.get<Opening[]>("http://localhost:3000/openings/")

  }

  addOpening(newOpening:any): Observable<Opening[]>{
        
      var headers = new HttpHeaders();
      headers.append('content-type','application/json');
      return this.http.post<Opening[]>("http://localhost:3000/openings",newOpening,{headers:headers})
              .pipe(
                  tap(()=> {
                      this._refreshNeeded$.next(newOpening);
                  })
              );       
  }
 
  deleteOpening(id:any){

       return this.http.delete('http://localhost:3000/openings/'+id)
            .pipe(map((res: any) => res.json()));
            
  }
 
  updateOpening(editOpening:any){

         var headers = new HttpHeaders();
         headers.append('content-type','application/json');
         return this.http.patch('http://localhost:3000/openings/'+editOpening._id,editOpening,{headers:headers})

  }

}