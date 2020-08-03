import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Result } from '../models/search.model';
import { SearchResultsComponent } from './search-results.component';
import SearchService from '../services/search.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('SearchResultsComponent', () => {
    let component: SearchResultsComponent;
    let fixture: ComponentFixture<SearchResultsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchResultsComponent],
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [SearchService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchResultsComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should initialise variables', () => {
        fixture.detectChanges();
        expect(component.results).toBeUndefined();
        expect(component.page).toEqual(1);
    });

    it('should call getResults in ngOnInit', () => {
        let spy = spyOn(component, 'getResults');
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
    });

    it("should call getResults and return results", async(() => {
        const response: Result = {
            meta: {
                total_items: 142,
                filter: {
                    starts: "2018-01-09",
                    ends: "2018-01-15",
                    fromTime: "00:00",
                    toTime: "23:59"
                },
            },
            data: [
                {
                    type: "slots",
                    id: "446269",
                    attributes: {
                        starts: "2018-01-09T06:40:00+00:00",
                        ends: "2018-01-09T07:20:00+00:00",
                        price: "12.05",
                        admin_fee: "0.00",
                        currency: "GBP",
                        availabilities: 0
                    }
                }
            ]
        };

        let spy = spyOn(component.searchService, 'getSlots').and.returnValue(of(response))

        component.getResults();

        expect(spy).toHaveBeenCalled();
        expect(component.results).toEqual(response);
    }));

    it('should call getDuration', () => {
        let startTests = {
            one: "2018-01-09T06:40:00+00:00",
            two: "2018-01-09T06:30:00+00:00"
        }
        let endTests = {
            one: "2018-01-09T07:20:00+00:00",
            two: "2018-01-09T08:00:00+00:00"
        }
        expect(component.getDuration(startTests.one, endTests.one)).toEqual('40 minutes');
        expect(component.getDuration(startTests.two, endTests.two)).toEqual('1 hour, 30 minutes');
    });

});
