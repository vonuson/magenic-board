import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardGuard } from './board.guard';

import { BoardListComponent } from './board-list/board-list.component';
import { BoardDetailsComponent } from './board-details/board-details.component';
import { PageNotFoundComponent } from '../shared/component/page-not-found.component';

const routes: Routes = [
    { path: '', component: BoardListComponent },
    { 
        path: ':id', 
        canActivate: [BoardGuard],
        component: BoardDetailsComponent 
    },
    {
        path: 'notFound/:id',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BoardRoutingModule { }
