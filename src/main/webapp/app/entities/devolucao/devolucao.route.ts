import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Devolucao } from 'app/shared/model/devolucao.model';
import { DevolucaoService } from './devolucao.service';
import { DevolucaoComponent } from './devolucao.component';
import { DevolucaoDetailComponent } from './devolucao-detail.component';
import { DevolucaoUpdateComponent } from './devolucao-update.component';
import { DevolucaoDeletePopupComponent } from './devolucao-delete-dialog.component';
import { IDevolucao } from 'app/shared/model/devolucao.model';

@Injectable({ providedIn: 'root' })
export class DevolucaoResolve implements Resolve<IDevolucao> {
    constructor(private service: DevolucaoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDevolucao> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Devolucao>) => response.ok),
                map((devolucao: HttpResponse<Devolucao>) => devolucao.body)
            );
        }
        return of(new Devolucao());
    }
}

export const devolucaoRoute: Routes = [
    {
        path: '',
        component: DevolucaoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Devolucaos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DevolucaoDetailComponent,
        resolve: {
            devolucao: DevolucaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Devolucaos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DevolucaoUpdateComponent,
        resolve: {
            devolucao: DevolucaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Devolucaos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DevolucaoUpdateComponent,
        resolve: {
            devolucao: DevolucaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Devolucaos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const devolucaoPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DevolucaoDeletePopupComponent,
        resolve: {
            devolucao: DevolucaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Devolucaos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
