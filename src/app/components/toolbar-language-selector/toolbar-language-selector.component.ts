import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { TranslateStoreService } from '@core/services/translate-store.service';

@Component({
  selector: 'app-toolbar-language-selector',
  templateUrl: './toolbar-language-selector.component.html',
  styleUrls: ['./toolbar-language-selector.component.scss']
})
export class ToolbarLanguageSelectorComponent implements OnInit, OnDestroy {
  public language: string;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(public translateStoreService: TranslateStoreService) { }

  ngOnInit() {
    this.translateStoreService.selectedLanguage
      .pipe(takeUntil(this.destroy$))
      .subscribe((lang: string) => {
        if (lang) {
          this.language = lang;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public setLang(lang: string): void {
    setTimeout(() => {
      this.translateStoreService.setLang(lang);
    }, 200);
  }
}
