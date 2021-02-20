import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { TranslateStoreService } from '@core/services/translate-store.service';
import { AuthService } from '@core/api-services/auth.service';
import { LocalStorageConstants } from '@core/constants/local-storage.constants';
import { SubjectsService } from '@core/services/subjects.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private translateStoreService: TranslateStoreService,
              private authService: AuthService,
              private translateService: TranslateService,
              private subjectsService: SubjectsService) {
    this.translateService.use(this.translateStoreService.getLanguage());
    this.authService.autoLogin();
  }

  ngOnInit(): void {
    this.setTheme();
  }

  public setTheme() {
    const body = document.querySelector('body');
    const themeClass = localStorage.getItem(LocalStorageConstants.theme);

    if (themeClass) {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
      body.classList.add(themeClass);
      this.subjectsService.theme$.next(themeClass);
    }
  }
}
