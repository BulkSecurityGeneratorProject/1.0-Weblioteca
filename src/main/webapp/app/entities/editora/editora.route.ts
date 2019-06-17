import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Editora } from 'app/shared/model/editora.model';
import { EditoraService } from './editora.service';
import { EditoraComponent } from './editora.component';
import { EditoraDetailComponent } from './editora-detail.component';
import { EditoraUpdateComponent } from './editora-update.component';
import { EditoraDeletePopupComponent } from './editora-delete-dialog.component';
import { IEditora } from 'app/shared/model/editora.model';

@Injectable({ providedIn: 'root' })
export class EditoraResolve implements Resolve<IEditora> {
    constructor(private service: EditoraService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEditora> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Editora>) => response.ok),
                map((editora: HttpResponse<Editora>) => editora.body)
            );
        }
        return of(new Editora());
    }
}

export const editoraRoute: Routes = [
    {
        path: '',
        component: EditoraComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Editoras'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: EditoraDetailComponent,
        resolve: {
            editora: EditoraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Editoras'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: EditoraUpdateComponent,
        resolve: {
            editora: EditoraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Editoras'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: EditoraUpdateComponent,
        resolve: {
            editora: EditoraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Editoras'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const editoraPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: EditoraDeletePopupComponent,
        resolve: {
            editora: EditoraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Editoras'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
