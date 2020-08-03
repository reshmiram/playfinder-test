import { Result, ApiParams } from '../models/search.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';

@Injectable()
export default class SearchService {
    private endpoint: string;
    private results = new Subject<Result>();

    private subscription: Subscription;

    constructor(private http: HttpClient) {}

    public getSlots(): Observable<Result> {
        return this.results.asObservable();
    }

    public loadResults(api_params: ApiParams) {
        this.endpoint =
            'https://api-v2.pfstaging.xyz/pitches/' +
            api_params.pitch_id +
            '/slots?filter%5Bstarts%5D=' +
            api_params.start_date +
            '&filter%5Bends%5D=' +
            api_params.end_date;

        this.subscription = this.http.get<Result>(this.endpoint).subscribe((results) => {
            this.results.next(results);
        });

        // this.http.get<Result>('/assets/slots.json').subscribe((result) => {
        //     this.results.next(result);
        // });
    }

    ngOnDestroy() {
        if(this.subscription) this.subscription.unsubscribe();
    }

    // public getResults(api_params: ApiParams) {
    //     this.endpoint =
    //         'https://api-v2.pfstaging.xyz/pitches/' +
    //         api_params.pitch_id +
    //         '/slots?filter%5Bstarts%5D=' +
    //         api_params.start_date +
    //         '&filter%5Bends%5D=' +
    //         api_params.end_date;

    //     return this.http.get<Result>(this.endpoint);
    // }
}
