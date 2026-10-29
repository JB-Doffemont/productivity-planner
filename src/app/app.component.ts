import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from './core/authentication.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  readonly #authService = inject(AuthenticationService);

  login() {
    console.log("login");
    
    const email = "john.doe@gmail.com";
    const password = "azerty";

    this.#authService.login(email, password).pipe(
      switchMap((response) => {
        console.log(response);
        
        const { email, localId, idToken } = response;
        return this.#authService.save(email, localId, idToken);
      })
    ).subscribe((response) => console.log(response));
  }

}
