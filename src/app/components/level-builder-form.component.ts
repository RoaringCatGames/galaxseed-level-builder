import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Level, Spawn } from '../models/level';
import { SpawnFormDialogComponent } from '../components/spawn-form.component';

@Component({
  selector: 'glb-level-builder-form',  
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `    
    <md-toolbar>
      <span class="toolbar-title">{{level.name}} - {{level.id}}</span>
      <span class="toolbar-center-spacer"></span>
      <span class="toolbar-actions"><button md-button routerLink="/">Back to List</button></span>
    </md-toolbar>

    <form #lvlfm="ngForm" (ngSubmit)="saveLevel(lvlfm.value)">
      <md-card>
        <md-card-title>Level Details</md-card-title>
        <md-card-subtitle>Metadata properties for the level</md-card-subtitle>        
        <md-card-content>
          <md-input-container>
            <input mdInput name="name" [ngModel]="level.name" [value]="level.name" placeholder="Level Name" >
          </md-input-container>
          <md-input-container>
            <input mdInput name="length" [ngModel]="level.length" [value]="level.length" placeholder="Length (Seconds)" >
          </md-input-container>    
        </md-card-content>
        <md-card-actions>
          <button md-raised-button type="submit">Save Level</button>      
        </md-card-actions>
      </md-card>
    </form>
    <md-toolbar>
      <span class="toolbar-title">Spawns ({{level.spawns.length}})</span>
      <span class="toolbar-center-spacer"></span>
      <span class="toolbar-actions"><button md-button (click)="presentSpawnDialog()">Add Spawn</button></span>
    </md-toolbar>
  `,  
})
export class LevelBuilderFormComponent{
  @Input() level: Level;

  @Output() spawnAdded:EventEmitter<Spawn> = new EventEmitter<Spawn>();
  @Output() levelSaved:EventEmitter<Level> = new EventEmitter<Level>();

  constructor(private dialog: MdDialog){
  }

  saveLevel(level: Level){
    console.log("Level Saving", level, Object.assign({}, this.level, level));

    this.levelSaved.emit(Object.assign({}, this.level, level));
  }
  doSubmit(spawnData: Spawn){    
    this.spawnAdded.emit(spawnData);
  }

  presentSpawnDialog(){
    let dialogRef = this.dialog.open(SpawnFormDialogComponent);
    dialogRef.afterClosed()
      .subscribe((result) => {
        console.log("Result", result);
        if(result){
          this.spawnAdded.emit(result);
        }
      });
  }

}