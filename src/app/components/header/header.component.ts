import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { LocalStorageConstants } from '@core/constants/local-storage.constants';
import { SubjectsService } from '@core/services/subjects.service';
import { AuthService } from '@core/api-services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public currentTheme: string;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private authService: AuthService,
              private subjectsService: SubjectsService) { }

  ngOnInit() {
    this.subjectsService.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe(theme => {
        this.currentTheme = theme;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onLogOut() {
    this.authService.logout();
  }

  public onThemeChange(e) {
    const body = document.querySelector('body');
    if (e.checked) {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
      this.currentTheme = 'dark-theme';
      localStorage.setItem(LocalStorageConstants.theme, 'dark-theme');
    } else {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
      this.currentTheme = 'light-theme';
      localStorage.setItem(LocalStorageConstants.theme, 'light-theme');
    }
  }
}
