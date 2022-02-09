import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ValidateUserGuard } from './guards/validate-user.guard';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./game/game.module').then( m => m.GameModule),
    canActivate: [ ValidateUserGuard ],
    canLoad: [ ValidateUserGuard ]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
