import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Profile } from "../models/profile.model";
import { HttpClient } from "@angular/common/http";
import { mockUser } from "../mock-user";
@Injectable({ providedIn: "root" })
export class ProfileService {
  constructor(private readonly http: HttpClient) {}

  get(username: string): Observable<Profile> {
    if (username === mockUser.username) {
      return of(mockUser);
    }
    return of({ username: "", bio: "User not found", image: "", following: false });
  }

  follow(username: string): Observable<Profile> {
    return this.http
      .post<{ profile: Profile }>("/profiles/" + username + "/follow", {})
      .pipe(map((data: { profile: Profile }) => data.profile));
  }

  unfollow(username: string): Observable<Profile> {
    return this.http
      .delete<{ profile: Profile }>("/profiles/" + username + "/follow")
      .pipe(map((data: { profile: Profile }) => data.profile));
  }
}
