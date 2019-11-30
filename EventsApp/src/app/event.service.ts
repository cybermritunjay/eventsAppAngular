import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _eventUrl = 'http://localhost:3000/api/getEvents';
  private _createEventUrl = 'http://localhost:3000/api/createEvents';
  private _userEventUrl = 'http://localhost:3000/api/getUserEvents';
  private _deleteEventUrl = 'http://localhost:3000/api/deleteUserEvents';
  constructor(private http: HttpClient) { }
 getEvents() {
    return this.http.get<any>(this._eventUrl);
   }
   getUserEvents(user) {
    return this.http.post<any>(this._userEventUrl,user);
   }
   createEvent(event){
     console.log(event)
    return this.http.post<any>(this._createEventUrl, event);
   }
   deleteEvent(event){
     console.log(event)
    return this.http.post<any>(this._deleteEventUrl, event);
   }
}