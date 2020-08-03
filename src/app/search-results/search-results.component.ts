import { Component, OnInit, OnDestroy } from '@angular/core';
import SearchService from '../services/search.service';
import { Result, ResultData } from '../models/search.model';
import * as moment from 'moment';
import {
    HumanizeDurationLanguage,
    HumanizeDuration,
} from 'humanize-duration-ts';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
    // public resultsNew: ResultData[];
    public results: Result;
    public page: number = 1;

    results$: Observable<ResultData[]>;

    constructor(
        public searchService: SearchService,
        // private store: Store<{ slots: ResultData[] }>
    ) {
        // this.results$ = this.store.pipe(select('slots'));
    }

    public langService: HumanizeDurationLanguage = new HumanizeDurationLanguage();
    public humanizer: HumanizeDuration = new HumanizeDuration(this.langService);

    public subscription: Subscription;

    ngOnInit(): void {
        this.getResults();
        // this.results$.subscribe(results => {
        //     console.log(results);
        //     if (results.length) {
        //         this.resultsNew = results;
        //     }
        // });
    }

    ngOnDestroy() {
        if(this.subscription) this.subscription.unsubscribe();
    }

    public getResults(): void {
        this.subscription = this.searchService.getSlots().subscribe((results) => {
            this.results = results;
        });
    }

    public getDuration(start: string, end: string) {
        const duration = moment
            .duration(moment(end).diff(moment(start)))
            .asMilliseconds();
        return this.humanizer.humanize(duration, { serialComma: false });
    }
}
