import { Component, OnInit} from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {SharedService} from '../shared.service';
import { addAndUpdateOpeningComponent } from '../addAndUpdateOpening/addAndUpdateOpening.component';
import {Opening} from '../shared/opening.model';
import { NotificationService } from '../shared/notification.service';
import { DialogService } from '../shared/dialog.service';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
  providers: [SharedService]
})

export class HomeComponent implements OnInit {
     
      openings: Opening[];
      tempArr: Opening[];
      opening : Opening;
      searchValue : string;
      p: number = 1;
      public maxSize: number = 5;

      _id             : string;
      jobtitle        : string;
      location        : string;
      EmployementType : string;
      Eligibility     : string;
      Work            : string;
      Note            : string;
      skills          : Array<string>; 
      status          : Boolean;
    
  constructor(public service: SharedService,
      public notificationService: NotificationService,
      private dialog: MatDialog,
      private dialogService: DialogService) {

  }

  ngOnInit(): void {

          this.getOpenings(); 

  } 


  Array1:any = [];
  onChange(event:any){

        if(event.target.checked){
            this.Array1  = this.tempArr.filter((res:any)=>res.status == true);
            this.openings = [];
            this.openings = this.Array1 ;
        }
        else{
           this.openings = this.tempArr;
        }
  }

  onDeactivate(opening:any){
    this.dialogService.openConfirmDialog('Are you sure to Deactivate this opening?')
      .afterClosed().subscribe(res=>{
          if(res){
               const statusChange ={
                  _id             : opening._id,
                  status          : false
                }

                this.service.updateOpening(statusChange)
                .subscribe(()=>{
                  this.service.refreshNeeded$
                  .subscribe(() => {
                       this.getOpenings();
                });
     
               this.getOpenings();
               
               this.notificationService.warn(':: Deactivated successfully');
                },(err)=>{
                 this.notificationService.warn('!Something went wrong');
               });
          }
      })
        
  }

  onActivate(opening:any){
    this.dialogService.openConfirmDialog('Are you sure to Activate this opening?')
    .afterClosed().subscribe(res=>{
        if(res){
              const statusChange = {
                _id             : opening._id,
                Date            : Date.now(),
                status          : true
              }

              this.service.updateOpening(statusChange)
              .subscribe(()=>{
                this.service.refreshNeeded$
                .subscribe(() => {
                     this.getOpenings();
              });
   
             this.getOpenings();
             
             this.notificationService.success(':: Activated successfully');
              },(err)=>{
               this.notificationService.warn('!Something went wrong');
             });
        }
    })
  }


  addOpeningPopUp() {
      
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "100%";
      const dialogRef = this.dialog.open(addAndUpdateOpeningComponent,dialogConfig);

      dialogRef.afterClosed().subscribe( result => {
            this.service.refreshNeeded$
            .subscribe(() => {
                 this.getOpenings();
            });

            this.getOpenings();
      });
  }
 
  
  onUpdate(opening:any){

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "100%";
        dialogConfig.data = opening;
        const dialogRef = this.dialog.open(addAndUpdateOpeningComponent,dialogConfig);

        dialogRef.afterClosed().subscribe( result => {
          this.service.refreshNeeded$
            .subscribe(() => {
                 this.getOpenings();
            });

          this.getOpenings();
        });
  }
  
  deleteOpening(id:any){
     
    var openings = this.openings;
     this.dialogService.openConfirmDialog('Are you sure to delete this opening?')
        .afterClosed().subscribe(res=>{
            if(res){
              this.service.deleteOpening(id)
              .subscribe(data => {
                    if(data.n == 1)
                    {
                      for(var i=0;i<openings.length;i++)
                      {
                        if(openings[i]._id == id)
                        {
                          openings.splice(i,1);
                        }
                      }
                    }
              })
    
              this.service.refreshNeeded$
                 .subscribe(() => {
                      this.getOpenings();
              });
    
              this.getOpenings();
              this.notificationService.warn('! Deleted Successfully');
             
            }
        })

  }
  
  private  getOpenings(){
       this.service.getOpenings()
         .subscribe((openings:any) => 
             this.openings = openings)

      this.service.getOpenings()
          .subscribe((opening:any) => 
              this.tempArr = opening)
  }
    
}
