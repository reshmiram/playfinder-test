import { Component} from "@angular/core";
import { Subscription } from 'rxjs';
import { ISlot } from '../models/search.model';
import SearchService from '../services/search.service';

@Component({
    selector: "app-search-slot",
    templateUrl: "./search-slot.component.html",
    styleUrls: ["./search-slot.component.scss"],
})
export class SearchSlotComponent {
    public selected: ISlot;
    private _subscriptions = new Subscription()

    constructor(public searchService: SearchService) {
    }

    ngOnInit(): void {
        this._subscriptions = this.searchService.getSelectedSlot().subscribe(selected => {
            this.selected = selected;
        })
    }

    ngOnDestroy() {
        this._subscriptions.unsubscribe();
    }
}
