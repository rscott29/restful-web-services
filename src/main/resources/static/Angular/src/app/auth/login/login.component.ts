import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NbAuthJWTToken, NbLoginComponent} from "@nebular/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends NbLoginComponent implements OnInit{
  ngOnInit() {
    this.service.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.router.navigate(['/home']);
      }
    });
  }
}
