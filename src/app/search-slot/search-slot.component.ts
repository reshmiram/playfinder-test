import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultData } from '../models/search.model';

@Component({
  selector: 'app-search-slot',
  templateUrl: './search-slot.component.html',
  styleUrls: ['./search-slot.component.scss']
})
export class SearchSlotComponent implements OnInit {

    results$: Observable<ResultData[]>;
    result$: Observable<ResultData>;

    public result: ResultData;

    constructor(
        // private store: Store<{ slots: ResultData[] }>,
    ) {
        // this.results$ = this.store.pipe(select('slots'));
        // this.store.dispatch({ type: '[Slots] Get One Slot', result_id: this.route.snapshot.params.id });

    }

    ngOnInit(): void {
        // this.results$.subscribe(results => {
        //     if(results.length !== 0) {
        //         console.log(results);
        //         console.log(this.route.snapshot.params.id);
        //         const result = results.filter(result => result.id = this.route.snapshot.params.id);
        //         console.log(result);
        //         // else dispatch event to get the results from API
        //     }
        // });
    }

}
