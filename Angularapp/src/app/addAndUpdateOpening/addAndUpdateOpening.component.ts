import { Component, OnInit,Inject } from '@angular/core';
import {SharedService} from '../shared.service';
import {FormGroup, FormControl,Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Opening} from '../shared/opening.model';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-addAndUpdateOpening',
  templateUrl: './addAndUpdateOpening.component.html',
  styleUrls: ['./addAndUpdateOpening.component.css'],
  providers: [SharedService]
})

export class addAndUpdateOpeningComponent implements OnInit {
  
  validPattern = /^[a-zA-Z0-9_!@#$%^&*()-/| ]*$/;
  
  openingForm = new FormGroup({
    _id  : new FormControl(''),
    title: new FormControl('', [Validators.required,Validators.pattern(this.validPattern)]),
    loc : new FormControl(0, [Validators.required]),
    Etype: new FormControl(0,[Validators.required]),
    eligibility: new FormControl('', [Validators.required,Validators.pattern(this.validPattern)]),
    work: new FormControl('',[Validators.pattern(this.validPattern)]),
    note: new FormControl('',[Validators.pattern(this.validPattern)]),
    skills: new FormControl([]),
    status: new FormControl()
  });

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl();
  filteredSkills: Observable<string[]>;
  selectedSkills: string[] = [];
  allSkills: string[] = ['JavaScript', 'NodeJs', 'AngularJs', 'MEAN Stack', 'Data Structures'];

  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(public service: SharedService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<addAndUpdateOpeningComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Opening) { 

      
      this.filteredSkills = this.skillCtrl.valueChanges.pipe(
          startWith(null),
          map((skill: string | null) => skill ? this._filter(skill) : this.allSkills.slice()));
  }

  ngOnInit(){
    
        this._id = this.data._id;
        this.jobtitle = this.data.jobtitle;
        for(let i=0;i < this.Locations.length;i++){
            if(this.Locations[i].value == this.data.location){
                  this.location  = (this.Locations[i].id).toString();
                  break; 
            }
        }
        for(let j=0;j < this.EmpTypes.length;j++){
          if(this.EmpTypes[j].value == this.data.EmployementType){
                this.EmployementType  = (this.EmpTypes[j].id).toString();
                break; 
          }
        }
        this.Eligibility = this.data.Eligibility;
        this.Work = this.data.Work;
        this.Note = this.data.Note;
        this.selectedSkills = this.data.skills;
        this.status = this.data.status;
  }
   
  Locations=[
        {id: 1, value: 'Mumbai'},
        {id: 2, value: 'Pune'},
        {id: 3, value: 'Bangalore'}
  ];

  EmpTypes=[
    {id: 1, value: 'Full Time'},
    {id: 2, value: 'Part Time'},
    {id: 3, value: 'Trainee'}
  ];
   
  onClose() {
    this.dialogRef.close();
  }

  onReset() {
    this.openingForm.reset();
    this.selectedSkills=[];
  }

  add(event: MatChipInputEvent): void {

      const value = (event.value || '').trim();
   
      // Add our skill
      if ((value || '').trim()) {
        if (value) {
          this.selectedSkills.push(value);
        }
      }

      // Clear the input value
      event.chipInput!.clear();

      this.skillCtrl.setValue(null);
  }

  remove(skill: string): void {
      const index = this.selectedSkills.indexOf(skill);

      if (index >= 0) {
        this.selectedSkills.splice(index, 1);
      }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
      if (!this.selectedSkills.includes(event.option.viewValue)) {
         this.selectedSkills.push(event.option.viewValue);
      }
      this.skillInput.nativeElement.value = '';
      this.skillCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();

      return this.allSkills.filter(skill => skill.toLowerCase().indexOf(filterValue) === 0);
  }
    
    openings: Opening[] = [];
    opening : Opening;
    
    _id             : string;
    jobtitle        : string;
    location        : string;
    EmployementType : string;
    Eligibility     : string;
    Work            : string;
    Note            : string;
    skills          : Array<string>;
    status          : Boolean;
    

  addOpening(){
      
      
      if(this.openingForm.valid){  
          
          if(this._id == undefined){

            const newOpening = {
              _id             : this._id,
              jobtitle        : this.jobtitle,
              location        : this.Locations[parseInt(this.location)-1].value,
              EmployementType : this.EmpTypes[parseInt(this.EmployementType)-1].value,
              Eligibility     : this.Eligibility,
              Work            : this.Work,
              Note            : this.Note,
              skills          : this.selectedSkills,
              Date            : Date.now(),
              status          : true,
            
            }

               this.service.addOpening(newOpening)
                   .subscribe((opening:any) => {
                      this.notificationService.success(':: Submitted successfully');
                      this.onClose();
                  },(err)=>{
                    this.notificationService.warn('!Something went wrong');
                  });
          }
          
          else{
              
            const updatedOpening = {
              _id             : this._id,
              jobtitle        : this.jobtitle,
              location        : this.Locations[parseInt(this.location)-1].value,
              EmployementType : this.EmpTypes[parseInt(this.EmployementType)-1].value,
              Eligibility     : this.Eligibility,
              Work            : this.Work,
              Note            : this.Note,
              skills          : this.selectedSkills,
              status          : this.status
             
            }
            
               this.service.updateOpening(updatedOpening)
                     .subscribe(()=>{
                        this.notificationService.success(':: Updated successfully');
                        this.onClose();
                     },(err)=>{
                      this.notificationService.warn('!Something went wrong');
                    });
        }
           

      }
  } 

}


