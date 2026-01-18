import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { UserCreateDto } from "app/models/usercreatedto";
import { UserUpdateDto } from "app/models/userupdatedto";

@Injectable({
  providedIn: "root",
})
export class UserService {
  //private apiUrl = "https://localhost:7005/api/User"; // adapte le port si nécessaire
  private apiUrl = "https://localhost:7005"; // adapte le port si nécessaire
  private token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoibWVkaW5pbWVkc2FpZEBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic3RyaW5nIHN0cmluZyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzU2NTY0NjcwLCJpc3MiOiJBc3RyZWVfYXBwcmVjb21tZW5kYXRpb24iLCJhdWQiOiJVc2VycyJ9.ORNy9uGuSQDSSspq_08XWmlDdSmbbDu32jCOnHQMq7E";
    //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoibWVkaW5pbWVkc2FpZEBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic3RyaW5nIHN0cmluZyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzU2MzM0NTM3LCJpc3MiOiJBc3RyZWVfYXBwcmVjb21tZW5kYXRpb24iLCJhdWQiOiJVc2VycyJ9.YRtlOBzy2oGsg9aUNqh2Ln4d9jfdG_9XSMX21CJV1l4";
  constructor(private http: HttpClient) {}
  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + "/api/User", {
      headers: this.getAuthHeaders(),
    });
  }
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  addUser(user: UserCreateDto): Observable<User> {
    return this.http.post<User>(this.apiUrl + "/create-user", user, {
      headers: this.getAuthHeaders(),
    });
  }

  updateUser(user: UserUpdateDto): Observable<User> {
  return this.http.put<User>(`${this.apiUrl}/api/User/${user.id}`, user,{
      headers: this.getAuthHeaders(),
    });
}

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-user/${id}`,{
      headers: this.getAuthHeaders(),
    });
  }

  uploadProfilePicture(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(
      `${this.apiUrl}/upload-profile-picture/${id}`,
      formData,{
      headers: this.getAuthHeaders(),
    });
    
  }
}
