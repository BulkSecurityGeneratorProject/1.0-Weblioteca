import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Autor } from 'app/shared/model/autor.model';
import { AutorService } from './autor.service';
import { AutorComponent } from './autor.component';
import { AutorDetailComponent } from './autor-detail.component';
import { AutorUpdateComponent } from './autor-update.component';
import { AutorDeletePopupComponent } from './autor-delete-dialog.component';
import { IAutor } from 'app/shared/model/autor.model';

@Injectable({ providedIn: 'root' })
export class AutorResolve implements Resolve<IAutor> {
    constructor(private service: AutorService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAutor> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Autor>) => response.ok),
                map((autor: HttpResponse<Autor>) => autor.body)
            );
        }
        return of(new Autor());
    }
}

export const autorRoute: Routes = [
    {
        path: '',
        component: AutorComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Autors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: AutorDetailComponent,
        resolve: {
            autor: AutorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Autors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: AutorUpdateComponent,
        resolve: {
            autor: AutorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Autors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: AutorUpdateComponent,
        resolve: {
            autor: AutorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Autors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const autorPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: AutorDeletePopupComponent,
        resolve: {
            autor: AutorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Autors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
