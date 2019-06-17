import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Reserva } from 'app/shared/model/reserva.model';
import { ReservaService } from './reserva.service';
import { ReservaComponent } from './reserva.component';
import { ReservaDetailComponent } from './reserva-detail.component';
import { ReservaUpdateComponent } from './reserva-update.component';
import { ReservaDeletePopupComponent } from './reserva-delete-dialog.component';
import { IReserva } from 'app/shared/model/reserva.model';

@Injectable({ providedIn: 'root' })
export class ReservaResolve implements Resolve<IReserva> {
    constructor(private service: ReservaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IReserva> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Reserva>) => response.ok),
                map((reserva: HttpResponse<Reserva>) => reserva.body)
            );
        }
        return of(new Reserva());
    }
}

export const reservaRoute: Routes = [
    {
        path: '',
        component: ReservaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Reservas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ReservaDetailComponent,
        resolve: {
            reserva: ReservaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Reservas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ReservaUpdateComponent,
        resolve: {
            reserva: ReservaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Reservas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ReservaUpdateComponent,
        resolve: {
            reserva: ReservaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Reservas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const reservaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ReservaDeletePopupComponent,
        resolve: {
            reserva: ReservaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Reservas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
