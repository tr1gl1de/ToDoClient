import { Component, OnInit } from '@angular/core';
import {NoteService} from "../_services/note.service";
import {Observable} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  countOfNotes: number = 0;

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.getCountOfNotes();
  }

  getCountOfNotes(): void
  {
    this.noteService.getCountOfNotes('api/note/count')
      .subscribe({
        next: (response: number) => this.countOfNotes = response,
        error: (err: HttpErrorResponse) => {}
      });
  }

}
