import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';


@Injectable()
export class GlobalService {


    private subject = new Subject<any>();
    
    constructor() {}
    sendMessage(message: string) {
        this.subject.next(message);
    }
 
    sendMessage2(message2: string) {
        this.subject.next(message2);
    }
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}  