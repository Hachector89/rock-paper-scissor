import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';

import { GameRoutingModule } from './game-routing.module';

import { GameComponent } from './pages/game/game.component';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    HomeComponent,
    GameComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    GameRoutingModule
  ]
})
export class GameModule { }
