import { TestBed, async } from '@angular/core/testing';
import SearchService from './search.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Result } from '../models/search.model';

describe('SearchService', () => {
    let service: SearchService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [SearchService],
            imports: [HttpClientTestingModule, RouterTestingModule]
        });
        service = TestBed.inject(SearchService);
    }));

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call getSlots', () => {
        const results: Result = {
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

        service["results"].next(results);
        expect(service.getSlots()).toEqual(service["results"].asObservable());
    });

    it('should call loadResults', async(() => {
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

        const api_params = {
            pitch_id: 1234,
            start_date: '2018-01-09',
            end_date: '2018-01-15'
        };

        const httpSpy = spyOn(service["http"], 'get').and.returnValue(of(response));
        const nextSpy = spyOn(service["results"], 'next');

        const expectedEndpoint = 'https://api-v2.pfstaging.xyz/pitches/1234/slots?filter%5Bstarts%5D=2018-01-09&filter%5Bends%5D=2018-01-15';
        service.loadResults(api_params);
        expect(service["endpoint"]).toEqual(expectedEndpoint);
        expect(httpSpy).toHaveBeenCalledWith(expectedEndpoint);
        // expect(httpSpy).toHaveBeenCalledWith('/assets/slots.json');
        expect(nextSpy).toHaveBeenCalledWith(response);
    }));

});
