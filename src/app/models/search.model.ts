import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

export class ApiParams {
    pitch_id: number;
    start_date: string;
    end_date: string;
}

export class FormInputs {
    pitch_id: number;
    start_date_object: NgbDateStruct;
    end_date_object: NgbDateStruct;
}

export class Result {
    meta: ResultMeta;
    data: ResultData[];
}

export class ResultMeta {
    total_items: number;
    filter: ResultMetaFilter;
}

export class ResultMetaFilter {
    starts: string;
    ends: string;
    fromTime: string;
    toTime: string;
}

export class ResultData {
    type: string;
    id: string;
    attributes: ResultDataAttributes;
}

export class ResultDataAttributes {
    starts: string;
    ends: string;
    price: string;
    admin_fee: string;
    currency: string;
    availabilities: number;
}
