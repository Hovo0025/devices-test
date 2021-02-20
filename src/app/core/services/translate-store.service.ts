import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

import { AppConstants, LocalStorageConstants } from '@core/constants';

@Injectable({
  providedIn: 'root'
})
export class TranslateStoreService {
  public selectedLanguage: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private translateService: TranslateService) {
  }

  getLanguage() {
    let currentLanguage = localStorage.getItem(LocalStorageConstants.currentLanguage);
    if (!currentLanguage) {
      currentLanguage = AppConstants.defaultLanguage;
      localStorage.setItem(LocalStorageConstants.currentLanguage, currentLanguage);
    }
    this.selectedLanguage.next(currentLanguage);
    return currentLanguage;
  }

  public setLang(langName: string): void {
    this.translateService.use(langName);
    this.selectedLanguage.next(langName);
    localStorage.setItem(LocalStorageConstants.currentLanguage, langName);
  }
}
