import { Component, OnInit } from '@angular/core';
import { BASE_URL, API_VERSION } from '../../shared/base.url';
import { LoopBackConfig } from '../../shared/sdk';
import { MatSnackBar, MatRadioButton, MatRadioGroup } from '@angular/material';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { RouterModule, Routes, RouterLink } from '@angular/router';

import { NotificationService } from '../../shared/services/notification.service';
import { AuthService } from '../../shared/services/auth.service';

import { Department, TaskMaster } from '../../shared/sdk/models';
import { MyServicesService } from '../../shared/services/myServices.service';
import { BreadcrumbComponent } from '../../secure/common/breadcrumb.component';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {

  mode = new FormControl('over');

  myDepartments: Department[] = [];
  myTasks: TaskMaster[] = [];

  isLoggedIn: Boolean;
  isLoggedIn$: Observable <Boolean>;
  devoteeName$: Observable <String>;
  username: String = '';
  userId: String = null;

  constructor(private notificationService: NotificationService,
    private authService: AuthService,
    private myServicesService: MyServicesService,
    private snackBar: MatSnackBar)
    {

      this.notificationService.notificationSubject.subscribe((message) => {
        snackBar.open(message, null , { duration: 2000, });
      });

      LoopBackConfig.setBaseURL(BASE_URL);
      LoopBackConfig.setApiVersion(API_VERSION);
    }

    ngOnInit() {
      this.authService.isLoggedIn
      .subscribe(
        isLoggedIn => {
          this.isLoggedIn = isLoggedIn;
          if (isLoggedIn) {
            this.username = this.authService.getCurrentUserData();
            this.devoteeName$ = this.authService.getDevoteeName;
            //console.log(this.username.);
            this.isLoggedIn$ = this.authService.isLoggedIn;
            // this.getAuthorizedDepartments();
            this.getAuthorizedTasks();
        } else {}
      });
    }
  
    onLogout() {
      this.myDepartments = [];
      this.myTasks = [];
      this.authService.logout();
    }
  
  
   
    getAuthorizedDepartments(): void {
      this.myServicesService.getAuthorizedDepartments()
        .subscribe(departments => { this.myDepartments = departments;
        });
    }

    getAuthorizedTasks(): void {
      this.myServicesService.getAuthorizedTasks()
        .subscribe(tasks => { 
          this.myTasks = tasks; 
        });
    }


}