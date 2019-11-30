import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../event.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  formError=""
  userName= null;
  createEvent = {creator:this.userName };
  constructor(private _auth: AuthService,private _eventService: EventService,private _router: Router) { }

  ngOnInit() {
    this.userName =this._auth.getUserName()
  }
  createNewEvent(eventForm) {
    if (eventForm.valid){
      this.createEvent.creator=this.userName
    this._eventService.createEvent(this.createEvent).subscribe(
      res => {
        this._router.navigate(['/admin-dash'])
      },
      err => this.formError=err.error
    )
    }else{
      console.log(eventForm)
      this.formError="All fields Must Be Filled Properly"
      //alert("sometging went wrong")
    }
  }

}
