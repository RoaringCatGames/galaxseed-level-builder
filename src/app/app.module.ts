import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DBModule } from '@ngrx/db';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MaterialModule } from '@angular/material';

import { ComponentsModule } from './components';
import { LevelEffects } from './effects/level.effects';

import { AppComponent } from './containers/app';
import { LevelListPageComponent } from './containers/level-list-page';
import { LevelBuilderPageComponent } from './containers/level-builder-page';
import { LevelJsonPageComponent } from './containers/level-json-page';
import { LevelDetailPageComponent } from './containers/level-detail-page';
import { NotFoundPageComponent } from './containers/not-found-page';

import { routes } from './routes';
import { reducer } from './reducers';
import { schema } from './db';



@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    ComponentsModule,
    RouterModule.forRoot(routes, { useHash: true }),

    /**
     * StoreModule.provideStore is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.provideStore(reducer),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store and uses
     * the store as the single source of truth for the router's state.
     */
    RouterStoreModule.connectRouter(),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrumentOnlyWithExtension(),

    /**
     * EffectsModule.run() sets up the effects class to be initialized
     * immediately when the application starts.
     *
     * See: https://github.com/ngrx/effects/blob/master/docs/api.md#run
     */    
    EffectsModule.run(LevelEffects),

    /**
     * `provideDB` sets up @ngrx/db with the provided schema and makes the Database
     * service available.
     */
    DBModule.provideDB(schema),
  ],
  declarations: [
    AppComponent,
    LevelListPageComponent,
    LevelBuilderPageComponent, 
    LevelJsonPageComponent,
    LevelDetailPageComponent,         
    NotFoundPageComponent
  ],
  providers: [    
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }