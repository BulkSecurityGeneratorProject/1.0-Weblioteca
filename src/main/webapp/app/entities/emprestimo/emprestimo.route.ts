import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Emprestimo } from 'app/shared/model/emprestimo.model';
import { EmprestimoService } from './emprestimo.service';
import { EmprestimoComponent } from './emprestimo.component';
import { EmprestimoDetailComponent } from './emprestimo-detail.component';
import { EmprestimoUpdateComponent } from './emprestimo-update.component';
import { EmprestimoDeletePopupComponent } from './emprestimo-delete-dialog.component';
import { IEmprestimo } from 'app/shared/model/emprestimo.model';

@Injectable({ providedIn: 'root' })
export class EmprestimoResolve implements Resolve<IEmprestimo> {
    constructor(private service: EmprestimoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEmprestimo> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Emprestimo>) => response.ok),
                map((emprestimo: HttpResponse<Emprestimo>) => emprestimo.body)
            );
        }
        return of(new Emprestimo());
    }
}

export const emprestimoRoute: Routes = [
    {
        path: '',
        component: EmprestimoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Emprestimos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: EmprestimoDetailComponent,
        resolve: {
            emprestimo: EmprestimoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Emprestimos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: EmprestimoUpdateComponent,
        resolve: {
            emprestimo: EmprestimoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Emprestimos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: EmprestimoUpdateComponent,
        resolve: {
            emprestimo: EmprestimoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Emprestimos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const emprestimoPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: EmprestimoDeletePopupComponent,
        resolve: {
            emprestimo: EmprestimoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Emprestimos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
