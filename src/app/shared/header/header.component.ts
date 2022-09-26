import { Component, OnInit } from '@angular/core';
import { AuthService, User } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user:User | null=null;
  constructor(private authServ:AuthService) { }

  ngOnInit(): void {
    this.authServ.userSubject.subscribe(res=>{
      this.user=res;
    })
  }
  logOut(){
    this.authServ.logOut();
  }
}
