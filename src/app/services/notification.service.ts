
import { Injectable} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  constructor(private message: NzMessageService) { }
  
  showSuccess(message: string): void {
    this.message.info(message);
  }
  
  showError(message: string): void {
    this.message.error(message);
  }
}