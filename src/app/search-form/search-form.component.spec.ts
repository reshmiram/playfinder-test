import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';
import SearchService from '../services/search.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchFormComponent } from './search-form.component';
import { SearchComponent } from '../search/search.component';

describe('SearchFormComponent', () => {
    const formBuilder: FormBuilder = new FormBuilder();
    let component: SearchFormComponent;
    let fixture: ComponentFixture<SearchFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchFormComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([
                    { path: '', component: SearchComponent },
                    {
                        path: ':pitch_id/:start_date/:end_date',
                        component: SearchComponent,
                    },
                ]),
                NgbModule,
                ReactiveFormsModule
            ],
            providers: [
                { provide: FormBuilder, useValue: formBuilder },
                Validators,
                SearchService
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchFormComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should initialise variables', () => {
        const date_object_expect = {
            year: null,
            month: null,
            day: null
        };

        const form_inputs_expect = {
            pitch_id: null,
            start_date_object: date_object_expect,
            end_date_object: date_object_expect
        };

        const api_params_expect = {
            pitch_id: null,
            start_date: null,
            end_date: null
        };

        fixture.detectChanges();
        expect(component.start_date_object).toEqual(date_object_expect);
        expect(component.end_date_object).toEqual(date_object_expect);
        expect(component.form_inputs).toEqual(form_inputs_expect);
        expect(component.api_params).toEqual(api_params_expect);
        expect(component.startDateString).toBeUndefined();
        expect(component.endDateString).toBeUndefined();
        expect(component.correctDates).toEqual(true);
        expect(component.correctDates).toEqual(true);
    });

    it('should call ngOnInit', () => {
        component.searchForm = component.fb.group({
            pitch_id: 1234,
            start_date_object: {
                year: 1,
                month: 2,
                day: 3,
            },
            end_date_object: {
                year: 1,
                month: 2,
                day: 3,
            },
        });
        const setParamsFromUrlSpy = spyOn(component, 'setParamsFromUrl');
        const createDateObjectSpy = spyOn(component, 'createDateObject');
        const setFormInputsSpy = spyOn(component, 'setFormInputs');
        const setInitialApiParamsSpy = spyOn(component, 'setInitialApiParams');
        const initialiseFormSpy = spyOn(component, 'initialiseForm');
        const populateFromUrlSpy = spyOn(component, 'populateFromUrl');
        fixture.detectChanges();
        expect(setParamsFromUrlSpy).toHaveBeenCalled();
        expect(createDateObjectSpy).toHaveBeenCalledWith(undefined);
        expect(createDateObjectSpy).toHaveBeenCalledWith(undefined);
        expect(createDateObjectSpy).toHaveBeenCalledTimes(2);
        expect(setFormInputsSpy).toHaveBeenCalled();
        expect(setInitialApiParamsSpy).toHaveBeenCalled();
        expect(initialiseFormSpy).toHaveBeenCalled();
        expect(populateFromUrlSpy).toHaveBeenCalled();
    });

    it('should call setParamsFromUrl and set variables if there are params', () => {
        component.route.snapshot.params.pitch_id = '1234';
        component.route.snapshot.params.start_date = '2018-01-09';
        component.route.snapshot.params.end_date = '2018-01-15';
        component.setParamsFromUrl();
        expect(component.pitch_id).toEqual(1234);
        expect(component.start_date).toEqual('2018-01-09');
        expect(component.end_date).toEqual('2018-01-15');
    });

    it('should call setParamsFromUrl and set variables to null if there are no params', () => {
        component.setParamsFromUrl();
        expect(component.pitch_id).toEqual(null);
        expect(component.start_date).toEqual(null);
        expect(component.end_date).toEqual(null);
    });

    it('should call populateFromUrl if url has params', () => {
        component.form_inputs = {
            pitch_id: 1234,
            start_date_object: {
                year: 2018,
                month: 1,
                day: 9,
            },
            end_date_object: {
                year: 2018,
                month: 1,
                day: 15,
            },
        };

        component.pitch_id = 1234;
        component.start_date = '2018-01-09';
        component.end_date = '2018-01-15';
        const onSubmitSpy = spyOn(component, 'onSubmit');
        component.populateFromUrl();
        expect(onSubmitSpy).toHaveBeenCalledWith(component.form_inputs, true);
    });

    it('should call populateFromUrl if url does not have params', () => {
        component.pitch_id = null;
        component.start_date = '';
        component.end_date = '';
        const onSubmitSpy = spyOn(component, 'onSubmit');
        component.populateFromUrl();
        expect(onSubmitSpy).not.toHaveBeenCalled();
    });

    it('should call setFormInputs', () => {
        const form_inputs_expect = {
            pitch_id: 1234,
            start_date_object: {
                year: 2018,
                month: 1,
                day: 9,
            },
            end_date_object: {
                year: 2018,
                month: 1,
                day: 15,
            },
        };

        component.pitch_id = 1234;
        component.start_date_object = {
            year: 2018,
            month: 1,
            day: 9,
        };
        component.end_date_object = {
            year: 2018,
            month: 1,
            day: 15,
        };

        component.setFormInputs();
        expect(component.form_inputs).toEqual(form_inputs_expect);
    });

    it('should call setInitialApiParams if url has params', () => {
        const api_params_expect = {
            pitch_id: 1234,
            start_date: '2018-01-09',
            end_date: '2018-01-15'
        };
        component.pitch_id = 1234;
        component.start_date = '2018-01-09';
        component.end_date = '2018-01-15';
        component.setInitialApiParams();
        expect(component.api_params).toEqual(api_params_expect);
    });

    it('should call setInitialApiParams if url does not have params', () => {
        const api_params_expect = {
            pitch_id: null,
            start_date: null,
            end_date: null
        };
        component.pitch_id = null;
        component.start_date = null;
        component.end_date = null;
        component.setInitialApiParams();
        expect(component.api_params).toEqual(api_params_expect);
    });

    it('should call initialiseForm', () => {
        const form_inputs_expect = {
            pitch_id: 1234,
            start_date_object: {
                year: 2018,
                month: 1,
                day: 9
            },
            end_date_object: {
                year: 2018,
                month: 1,
                day: 15
            },
        };

        component.form_inputs = {
            pitch_id: 1234,
            start_date_object: {
                year: 2018,
                month: 1,
                day: 9
            },
            end_date_object: {
                year: 2018,
                month: 1,
                day: 15
            },
        };

        component.initialiseForm();
        expect(component.searchForm.get('pitch_id').value).toEqual(form_inputs_expect.pitch_id);
        expect(component.searchForm.get('start_date_object').value).toEqual(form_inputs_expect.start_date_object);
        expect(component.searchForm.get('end_date_object').value).toEqual(form_inputs_expect.end_date_object);
    });

    it('should call createDateString with a date object and return the correct value', () => {
        const dateObject1 = {
            year: 2018,
            month: 11,
            day: 19
        };
        const dateObject2 = {
            year: 2018,
            month: 1,
            day: 9
        };
        expect(component.createDateString(dateObject1)).toEqual('2018-11-19')
        expect(component.createDateString(dateObject2)).toEqual('2018-01-09')
    });

    it('should call createDateObject with a date string and return the correct value', () => {
        const dateString1 = '2018-11-19';
        const dateString2 = '2018-01-09';
        const dateString3 = null;
        const dateObject1 = {
            year: 2018,
            month: 11,
            day: 19
        };
        const dateObject2 = {
            year: 2018,
            month: 1,
            day: 9
        };
        const dateObject3 = {
            year: null,
            month: null,
            day: null
        };
        expect(component.createDateObject(dateString1)).toEqual(dateObject1);
        expect(component.createDateObject(dateString2)).toEqual(dateObject2);
        expect(component.createDateObject(dateString3)).toEqual(dateObject3);
    });

    it('should call checkEndDate with a form_inputs object and return the correct value', () => {
        const formInputsCorrect = {
            pitch_id: 1234,
            start_date_object: {
                year: 2018,
                month: 1,
                day: 9
            },
            end_date_object: {
                year: 2018,
                month: 1,
                day: 15
            },
        };
        const formInputsIncorrect = {
            pitch_id: 1234,
            start_date_object: {
                year: 2018,
                month: 1,
                day: 15
            },
            end_date_object: {
                year: 2018,
                month: 1,
                day: 9
            },
        };
        expect(component.checkEndDate(formInputsCorrect)).toEqual(true);
        expect(component.checkEndDate(formInputsIncorrect)).toEqual(false);
    });

    it('should call isDateCorrect with same date values and return true', () => {
        component.startDateString = '2018-11-19';
        component.endDateString = '2018-11-19';
        expect(component.isDateCorrect()).toEqual(true);
    });

    it('should call isDateCorrect with different but correct date values and return true', () => {
        component.startDateString = '2018-11-19';
        component.endDateString = '2018-11-20';
        expect(component.isDateCorrect()).toEqual(true);
    });

    it('should call isDateCorrect with different but incorrect date values and return false', () => {
        component.startDateString = '2018-11-20';
        component.endDateString = '2018-11-19';
        expect(component.isDateCorrect()).toEqual(false);
    });

    it('should call onSubmit and load results if form has values and dates are correct', () => {
        const form_inputs = {
            pitch_id: 1234,
            start_date_object: {
                year: 2018,
                month: 1,
                day: 9
            },
            end_date_object: {
                year: 2018,
                month: 1,
                day: 15
            },
        };

        component.startDateString = '2018-01-09';
        component.endDateString = '2018-01-15';

        const api_params_expect = {
            pitch_id: 1234,
            start_date: '2018-01-09',
            end_date: '2018-01-15'
        };

        const setCorrectDatesSpy = spyOn(component, 'setCorrectDates');
        const searchServiceLoadResultsSpy = spyOn(component.searchService, 'loadResults');
        const setUrlSpy = spyOn(component, 'setUrl');
        component.correctDates = true;
        component.onSubmit(form_inputs, true);
        expect(setCorrectDatesSpy).toHaveBeenCalledWith(form_inputs, true);
        expect(component.api_params).toEqual(api_params_expect);
        expect(searchServiceLoadResultsSpy).toHaveBeenCalledWith(api_params_expect);
        expect(setUrlSpy).toHaveBeenCalled();
    });

    it('should call onSubmit and not load results if correctDates is false', () => {
        const form_inputs = {
            pitch_id: null,
            start_date_object: {
                year: null,
                month: null,
                day: null
            },
            end_date_object: {
                year: 2018,
                month: 1,
                day: 15
            },
        };

        const setCorrectDatesSpy = spyOn(component, 'setCorrectDates');
        const searchServiceLoadResultsSpy = spyOn(component.searchService, 'loadResults');
        const setUrlSpy = spyOn(component, 'setUrl');
        component.correctDates = false;
        component.onSubmit(form_inputs, false);
        expect(setCorrectDatesSpy).toHaveBeenCalledWith(form_inputs, false);
        expect(searchServiceLoadResultsSpy).not.toHaveBeenCalled();
        expect(setUrlSpy).not.toHaveBeenCalled();
    });

    it('should call setCorrectDates and set correctDates to false if form is not valid', () => {
        const form_inputs = {
            pitch_id: null,
            start_date_object: {
                year: null,
                month: null,
                day: null
            },
            end_date_object: {
                year: 2018,
                month: 1,
                day: 15
            },
        };
        component.setCorrectDates(form_inputs, false);
        expect(component.correctDates).toEqual(false);
    });

    it('should call setCorrectDates and then set correctDates to checkEndDate if form is valid', () => {
        const form_inputs = {
            pitch_id: 1234,
            start_date_object: {
                year: 2018,
                month: 1,
                day: 9
            },
            end_date_object: {
                year: 2018,
                month: 1,
                day: 15
            },
        };
        const checkEndDateSpy = spyOn(component, 'checkEndDate').and.returnValue(true);
        component.setCorrectDates(form_inputs, true);
        expect(checkEndDateSpy).toHaveBeenCalledWith(form_inputs);
        expect(component.correctDates).toEqual(true);
    });

    it('should call setUrl and navigate to new route', () => {
        component.api_params = {
            pitch_id: 1234,
            start_date: '2018-01-09',
            end_date: '2018-01-15'
        }

        const routerNavigateSpy = spyOn(component.router, 'navigate');
        component.setUrl();
        expect(routerNavigateSpy).toHaveBeenCalledWith(['/', 1234, '2018-01-09', '2018-01-15']);
    });

});
