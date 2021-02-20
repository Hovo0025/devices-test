import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  theme$: BehaviorSubject<string> = new BehaviorSubject<string>('light-theme');
}
