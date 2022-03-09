import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { SlotEffects } from './search-slot.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
    getSlots,
    getSlotsSuccess
  } from '../actions/search-slot.actions';

import { TestScheduler } from 'rxjs/testing';
import SearchService from '../../../services/search.service';

describe('SlotEffects', () => {
  const initialState = { 
	entities: {},
	loading: false,
	errors: null
  };
  const searchService = jasmine.createSpyObj('searchService', [
    'getResults'
  ]);
  let effects: SlotEffects;
  let actions: Observable<any>;
  let store: MockStore<any>;
  let testScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SlotEffects,
        provideMockStore({ initialState }),
        provideMockActions(() => actions),
        { provide: SearchService, useValue: searchService }
      ]
    });

    effects = TestBed.inject(SlotEffects);
    store = TestBed.inject(MockStore);
    store.setState({ initialState });

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('getAllShows$', () => {
    it('should handle getSlots and return a getSlotsSuccess action', () => {
      const payload = [
		{
			"type": "slots",
			"id": "446269",
			"attributes": {
				"starts": "2018-01-09T06:40:00+00:00",
				"ends": "2018-01-09T07:20:00+00:00",
				"price": "12.05",
				"admin_fee": "0.00",
				"currency": "GBP",
				"availabilities": 0
			}
		},
		{
			"type": "slots",
			"id": "446270",
			"attributes": {
				"starts": "2018-01-09T07:20:00+00:00",
				"ends": "2018-01-09T08:00:00+00:00",
				"price": "9.90",
				"admin_fee": "0.00",
				"currency": "GBP",
				"availabilities": 0
			}
		}
	  ];
	  const arg = {
		  payload: {
			end_date: "2022-03-09",
			pitch_id: 37128,
			start_date: "2022-03-09"
		  }
	  }
      const action = getSlots(arg);
      const outcome = getSlotsSuccess({payload});

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });
        const response = cold('-b|', { b: payload });
        searchService.getResults.and.returnValue(response);

        expectObservable(effects.loadSlots$).toBe('--b', { b: outcome });
      });
    });
  });
});