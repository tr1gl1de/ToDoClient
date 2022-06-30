import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RepositoryExtensionsService} from "../_helpers/repository-extensions.service";
import {EnvironmentUrlService} from "./environment-url.service";
import {NoteForCreation} from "../_models/note/note-for-creation.model";
import {Observable} from "rxjs";
import {NoteForRead} from "../_models/note/note-for-read.model";
import {NoteForUpdate} from "../_models/note/note-for-update.model";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient, private reposExtensions: RepositoryExtensionsService,
              private envUrl: EnvironmentUrlService) { }

  public createNote(route: string, noteCreate: NoteForCreation): Observable<NoteForRead> {
    return this.http.post<NoteForRead>(
      this.reposExtensions.createCompleteRoute(route, this.envUrl.urlAddress),
      noteCreate,
      this.reposExtensions.generateHeaders()
    );
  }

  public getNote(route: string): Observable<NoteForRead> {
    return this.http.get<NoteForRead>(
      this.reposExtensions.createCompleteRoute(route, this.envUrl.urlAddress),
      this.reposExtensions.generateHeaders()
    );
  }

  public getNotes(route: string): Observable<NoteForRead[]> {
    return this.http.get<NoteForRead[]>(
      this.reposExtensions.createCompleteRoute(route, this.envUrl.urlAddress),
      this.reposExtensions.generateHeaders()
    );
  }

  // TODO: Add func searchNotes() later when completed pagination

  public updateNote(route: string, noteUpd: NoteForUpdate): Observable<void> {
    return this.http.put<void>(
      this.reposExtensions.createCompleteRoute(route, this.envUrl.urlAddress),
      noteUpd,
      this.reposExtensions.generateHeaders()
    );
  }

  public deleteNote(route: string): Observable<void> {
    return this.http.delete<void>(
      this.reposExtensions.createCompleteRoute(route, this.envUrl.urlAddress),
      this.reposExtensions.generateHeaders()
    );
  }
}
