import { Component, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { Spawn } from '../models/level';

@Component({
  selector:'glb-spawn-form-dialog',
  template:`
   <form (ngSubmit)="doSubmit(fm.value)" #fm="ngForm">
      
      <md-card>
        <md-card-title>Core Properties</md-card-title>
        <md-card-content>
          <md-input-container>
            <input mdInput id="time" name="time" type="text" 
                    value="0" ngModel class="fw"
                    placeholder="Spawn Time (Seconds)" required>
          </md-input-container>      
              
          <md-select id="enemyType" class="fw" name="enemyType" ngModel placeholder="Enemy Type" required>
            <md-option value="ASTEROID_FRAG" selected>Frag</md-option>
            <md-option value="ASTEROID_A">Purple Asteroid (Large)</md-option>
            <md-option value="ASTEROID_B">Blue Asteroid (Med)</md-option>
            <md-option value="ASTEROID_C">Brown Asteroid (Small)</md-option>
            <md-option value="COMET">Comet</md-option>
          </md-select>
          

                
          <md-select id="offsetQuad" class="fw" name="offsetType" ngModel placeholder="Offset Type" required>
            <md-option value="QUAD_1" selected>QUAD 1 (Upper Right)</md-option>
            <md-option value="QUAD_2">QUAD 2 (Upper Left)</md-option>
            <md-option value="QUAD_3">QUAD 3 (Bottom Left)</md-option>
            <md-option value="QUAD_4">QUAD 4 (Bottom Right)</md-option>
            <md-option value="CENTER">Screen Center</md-option>
          </md-select> 
        </md-card-content>
      </md-card>

      <md-card ngModelGroup="offsetPosition">
        <md-card-title>Starting Offset Position</md-card-title>   
        <md-card-content>     
          <md-input-container>          
            <input mdInput id="offPosX" name="x" type="number" 
                    value="0.0" ngModel class="fw"
                    placeholder="Offset X" required>          
          </md-input-container>        
          <md-input-container>
            <input mdInput id="offPosY" name="y" type="number" 
                    value="0.0" ngModel class="fw"
                    placeholder="Offset Y" required>
          </md-input-container>
        </md-card-content>
      </md-card>

      <md-card ngModelGroup="velocity">
        <md-card-title>Velocity</md-card-title>   
        <md-card-content>     
          <md-input-container>
            <input mdInput id="velocityX" name="x" type="number"
                    value="0.0" ngModel class="fw" 
                    placeholder="Velocity X" required>
          </md-input-container>        
          <md-input-container> 
            <input mdInput id="velocityY" name="y" type="number" 
                    value="0.0" ngModel class="fw" 
                    placeholder="Velocity Y" required>
          </md-input-container>
        </md-card-content>
      </md-card>
      
      <button md-raised-button class="fw" [disabled]="fm.pristine || !fm.valid" type="submit">Add Spawn</button>      
    </form>
  `,
  styles:[
    `.fw{ 
      margin: 0.5em 0;
      width: 100%; 
    }`
  ]
})
export class SpawnFormDialogComponent {
  constructor(private dialogRef: MdDialogRef<SpawnFormDialogComponent>){    
  }

   doSubmit(spawnData: Spawn){    
    this.dialogRef.close(spawnData);
  }
}