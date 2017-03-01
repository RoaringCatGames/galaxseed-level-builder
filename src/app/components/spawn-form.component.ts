import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MdDialogRef } from '@angular/material';

import { Spawn } from '../models/level';

@Component({
  selector:'glb-spawn-form-dialog',
  template:`

  <button md-button (click)="preset(1)">Comet TL->BR</button>
  <button md-button (click)="preset(2)">Comet TR->BL</button>
  <button md-button (click)="preset(3)">Frag</button>
  <button md-button (click)="preset(4)">Asteroid L->R</button>
   <form (ngSubmit)="doSubmit(fm.value)" #fm="ngForm">
      
      <md-card>
        <md-card-subtitle>Core Properties</md-card-subtitle>
        <md-card-content>
          <md-input-container>
            <input mdInput name="spawnTime" type="text" 
                    value="0" ngModel class="fw"
                    placeholder="Spawn Time (Seconds)" required>
          </md-input-container>      
              
          <md-select id="enemyType" class="fw" name="enemyType" ngModel placeholder="Enemy Type" required>
            <md-option value="ASTEROID_FRAG" selected>Frag</md-option>
            <md-option value="ASTEROID_C">Purple Asteroid (Large)</md-option>
            <md-option value="ASTEROID_B">Blue Asteroid (Med)</md-option>
            <md-option value="ASTEROID_A">Brown Asteroid (Small)</md-option>
            <md-option value="COMET">Comet</md-option>
          </md-select>        
          
          <md-checkbox name="shouldGeneratePowerUp" ngModel>Generates Power-Up</md-checkbox>
        </md-card-content>
      </md-card>

      <md-card ngModelGroup="startPosition">
        <md-card-subtitle>Starting Offset Position</md-card-subtitle>   
        <md-card-content>     
          <md-input-container>          
            <input mdInput id="offPosX" name="x" type="text" 
                    value="0.0" ngModel class="fw"
                    placeholder="Offset X" required>          
          </md-input-container>        
          <md-input-container>
            <input mdInput id="offPosY" name="y" type="text" 
                    value="0.0" ngModel class="fw"
                    placeholder="Offset Y" required>
          </md-input-container>
          
          <md-select class="fw" name="offsetQuadrant" ngModel ngControl="enemyType" placeholder="Offset Type" required>
            <md-option value="QUAD_1" selected>QUAD 1 (Upper Right)</md-option>
            <md-option value="QUAD_2">QUAD 2 (Upper Left)</md-option>
            <md-option value="QUAD_3">QUAD 3 (Bottom Left)</md-option>
            <md-option value="QUAD_4">QUAD 4 (Bottom Right)</md-option>
            <md-option value="CENTER">Screen Center</md-option>
          </md-select> 
        </md-card-content>
      </md-card>

      <md-card ngModelGroup="midBezierPoint" [class.hidden]="fm.value.enemyType != 'COMET'">
        <md-card-subtitle>Mid Bezier Curve Point</md-card-subtitle>   
        <md-card-content>     
          <md-input-container>          
            <input mdInput id="offPosX" name="x" type="text" 
                    value="0.0" ngModel class="fw"
                    placeholder="Offset X" [attr.required]="isNotComet">
          </md-input-container>        
          <md-input-container>
            <input mdInput id="offPosY" name="y" type="text" 
                    value="0.0" ngModel class="fw"
                    placeholder="Offset Y" [attr.required]="isNotComet">
          </md-input-container>
          
          <md-select class="fw" name="offsetQuadrant" ngModel placeholder="Offset Type" [attr.required]="isNotComet">
            <md-option value="QUAD_1" selected>QUAD 1 (Upper Right)</md-option>
            <md-option value="QUAD_2">QUAD 2 (Upper Left)</md-option>
            <md-option value="QUAD_3">QUAD 3 (Bottom Left)</md-option>
            <md-option value="QUAD_4">QUAD 4 (Bottom Right)</md-option>
            <md-option value="CENTER">Screen Center</md-option>
          </md-select> 
        </md-card-content>
      </md-card>

      <md-card ngModelGroup="endPoint" [class.hidden]="isNotComet">
        <md-card-subtitle>End Curve Point</md-card-subtitle>   
        <md-card-content>     
          <md-input-container>          
            <input mdInput id="offPosX" name="x" type="text" 
                    value="0.0" ngModel class="fw"
                    placeholder="Offset X" [attr.required]="isNotComet">          
          </md-input-container>        
          <md-input-container>
            <input mdInput id="offPosY" name="y" type="text" 
                    value="0.0" ngModel class="fw"
                    placeholder="Offset Y" [attr.required]="isNotComet">
          </md-input-container>
          
          <md-select class="fw" name="offsetQuadrant" ngModel placeholder="Offset Type" [attr.required]="isNotComet">
            <md-option value="QUAD_1" selected>QUAD 1 (Upper Right)</md-option>
            <md-option value="QUAD_2">QUAD 2 (Upper Left)</md-option>
            <md-option value="QUAD_3">QUAD 3 (Bottom Left)</md-option>
            <md-option value="QUAD_4">QUAD 4 (Bottom Right)</md-option>
            <md-option value="CENTER">Screen Center</md-option>
          </md-select> 
        </md-card-content>
      </md-card>

      <md-card ngModelGroup="speed">
        <md-card-subtitle>Velocity</md-card-subtitle>   
        <md-card-content>     
          <md-input-container>
            <input mdInput id="velocityX" name="x" type="text"
                    value="0.0" ngModel class="fw" 
                    placeholder="Velocity X" required>
          </md-input-container>        
          <md-input-container> 
            <input mdInput id="velocityY" name="y" type="text" 
                    value="0.0" ngModel class="fw" 
                    placeholder="Velocity Y" required>
          </md-input-container>          
        </md-card-content>
      </md-card>
      
      <button md-raised-button class="fw" [disabled]="!fm.valid" type="submit">Add Spawn</button>      
    </form>
  `,
  styles:[
    `.fw{ 
      margin: 0.25em 0;      
    }`,
    `.hidden{
      display: none;
    }`
  ]
})
export class SpawnFormDialogComponent {

  @ViewChild('fm') fm: NgForm;

  constructor(private dialogRef: MdDialogRef<SpawnFormDialogComponent>){    
  }

   doSubmit(spawnData: Spawn){    
    this.dialogRef.close(spawnData);
  }

  get isNotComet(){
    return this.fm !== undefined && this.fm.value.enemyType != 'COMET';
  }

  preset(value: number){
    let presetSpawn: Spawn;

    switch(value){
      case 1:
        presetSpawn = {
          spawnTime: 1,
          enemyType: "COMET",
          shouldGeneratePowerUp: false,
          startPosition: { x: -1, y: 3, offsetQuadrant: "QUAD_2" },
          midBezierPoint: { x: -5, y: -5, offsetQuadrant: "QUAD_3" },
          endPoint: { x: 10, y: -10, offsetQuadrant: "QUAD_3" },
          speed: { x: 5, y: 5 }
        };
        break;

      case 2:
        presetSpawn = {
          spawnTime: 1,
          enemyType: "COMET",
          shouldGeneratePowerUp: false,
          startPosition: { x: 1, y: 3, offsetQuadrant: "QUAD_1" },
          midBezierPoint: { x: 5, y: -5, offsetQuadrant: "QUAD_4" },
          endPoint: { x: -10, y: -10, offsetQuadrant: "QUAD_3" },
          speed: { x: 5, y: 5 }
        };
        break;
      case 3:
        presetSpawn = {
          spawnTime: 1,
          enemyType: "ASTEROID_FRAG",
          shouldGeneratePowerUp: false,
          startPosition: { x: -2, y: 0, offsetQuadrant: "CENTER" },   
          midBezierPoint: { x: 0, y: 0, offsetQuadrant: "" },
          endPoint: { x: 0, y: 0, offsetQuadrant: "" },
          speed: { x: 0, y: -0.25 }
        };
        break;
      case 4:
        presetSpawn = {
          spawnTime: 1,
          enemyType: "ASTEROID_C",
          shouldGeneratePowerUp: false,
          startPosition: { x: -4, y: -3, offsetQuadrant: "QUAD_2" },
          midBezierPoint: { x: 0, y: 0, offsetQuadrant: "" },
          endPoint: { x: 0, y: 0, offsetQuadrant: "" },
          speed:{ x: 3, y: -0.75 }
        };
        break;
      default:
        presetSpawn = {
          spawnTime: 1,
          enemyType: "ASTEROID_A",
          shouldGeneratePowerUp: false,
          startPosition: { x: 4, y: -3, offsetQuadrant: "QUAD_1" },
          midBezierPoint: { x: 0, y: 0, offsetQuadrant: "" },
          endPoint: { x: 0, y: 0, offsetQuadrant: "" },
          speed:{ x: -3, y: -0.75 }
        };
        break;
    }    
    this.fm.resetForm(presetSpawn);    
    
  }
}