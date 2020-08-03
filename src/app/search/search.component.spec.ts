import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { SearchFormComponent } from '../search-form/search-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import SearchService from '../services/search.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchComponent, SearchResultsComponent, SearchFormComponent],
            imports: [RouterTestingModule, HttpClientTestingModule, NgbModule, ReactiveFormsModule],
            providers: [
                FormBuilder,
                Validators,
                SearchService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
