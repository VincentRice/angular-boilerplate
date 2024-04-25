import { Injectable } from '@angular/core';
import { Router, ActivedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '@app/_service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {}

    canActivate(route: ActivedRouteSnapshot, state: RouterStateSnapshot) {
        const account = this.accountService.accountValue;
        if (account) {
            // check if route is restricted by role
            if(route.data.roles && !route.data.roles.includes(account.role)) {
                // role not authorized so redicrect to home page
                this.router.navigate(['/']);
                return false;
            }

            // authorized so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}