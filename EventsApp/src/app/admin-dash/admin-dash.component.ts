import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent implements OnInit {
  Events = [];
  userName= null;
  constructor(private _auth: AuthService,private _eventService: EventService,
    private _router: Router) { }

  ngOnInit() {
    this.userName =this._auth.getUserName()
    this._eventService.getUserEvents({creator:this.userName}).subscribe
    (
      res => this.Events = res,
      err => {
        if( err instanceof HttpErrorResponse ) {
          if (err.status === 401) {
            this._router.navigate([''])
          }
        }
      }
    );
  }
  deleteEvent(id){
    this._eventService.deleteEvent({id:id,creator:this.userName}).subscribe
    (
      res => window.location.reload(),
      err => {
        if( err instanceof HttpErrorResponse ) {
          if (err.status === 401) {
            this._router.navigate(['/admin-dash'])
          }
        }
      }
    );
  }

}
