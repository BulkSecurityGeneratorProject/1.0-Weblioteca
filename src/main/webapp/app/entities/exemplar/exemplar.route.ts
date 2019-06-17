import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Exemplar } from 'app/shared/model/exemplar.model';
import { ExemplarService } from './exemplar.service';
import { ExemplarComponent } from './exemplar.component';
import { ExemplarDetailComponent } from './exemplar-detail.component';
import { ExemplarUpdateComponent } from './exemplar-update.component';
import { ExemplarDeletePopupComponent } from './exemplar-delete-dialog.component';
import { IExemplar } from 'app/shared/model/exemplar.model';

@Injectable({ providedIn: 'root' })
export class ExemplarResolve implements Resolve<IExemplar> {
    constructor(private service: ExemplarService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IExemplar> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Exemplar>) => response.ok),
                map((exemplar: HttpResponse<Exemplar>) => exemplar.body)
            );
        }
        return of(new Exemplar());
    }
}

export const exemplarRoute: Routes = [
    {
        path: '',
        component: ExemplarComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Exemplars'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ExemplarDetailComponent,
        resolve: {
            exemplar: ExemplarResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Exemplars'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ExemplarUpdateComponent,
        resolve: {
            exemplar: ExemplarResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Exemplars'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ExemplarUpdateComponent,
        resolve: {
            exemplar: ExemplarResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Exemplars'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const exemplarPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ExemplarDeletePopupComponent,
        resolve: {
            exemplar: ExemplarResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Exemplars'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
