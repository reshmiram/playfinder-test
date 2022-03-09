import * as fromReducer from './search-slot.reducer';

describe('ShowsReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown'
      };
      const state = fromReducer.searchSlotReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('get slots', () => {
    it('should set loading to true', () => {
      const { initialState } = fromReducer;
      const action = {
        type: '[Slots] Get All Slots'
      };
      const state = fromReducer.searchSlotReducer(initialState, action);
      expect(state.loading).toBe(true);
    });
  });

  describe('get slots success', () => {
    it('should set loading to false', () => {
      const { initialState } = fromReducer;
      const action = {
        type: '[Slots] Get All Slots Success',
        payload: [
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
        ]
      };
      const state = fromReducer.searchSlotReducer(initialState, action);
      expect(state.loading).toBe(false);
    });
  });


});