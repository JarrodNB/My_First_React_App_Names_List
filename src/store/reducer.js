import * as aType from './actions';
import sortBabies from '../helpers/sort';

const initialState = {
  list_id: null,
  public_id: null,
  babies: [],
  sortAsc: [true, true, true]
}

const reducer = (state = initialState, action) => {
  let newState = null;
  switch (action.type){
    case aType.CREATE_LIST:
      newState = {
        ...state,
        public_id: action.public_id,
        list_id: action.list_id,
        babies: action.babies
      }
      return newState;
    case aType.ADD_BABY:
      const babyIndex = state.babies.findIndex(b => {
        return action.baby.id === b.id;
      });
      if (babyIndex < 0) {
        return {
          ...state,
          babies: [...state.babies, action.baby]
        }
      }
      return state;
    case aType.CROSS_BABY:
      const babyIdx = state.babies.findIndex(b => {
        return action.id === b.id;
      });
      if (state.babies[babyIdx].crossed_out === action.crossed_out){
        return state;
      }
      const baby = {...state.babies[babyIdx], crossed_out: action.crossed_out};
      const newBabies = state.babies.slice();
      newBabies.splice(babyIdx, 1, baby);
      return {
        ...state,
        babies: newBabies
      }
    case aType.ORDER_BABIES:
      const sorted = sortBabies(state.babies, action.sortOrder, state.sortAsc.slice())
      newState = {
        ...state,
        babies: sorted[0],
        sortAsc: sorted[1]
      }
      return newState;
    default: 
      return state;
  }
}

export default reducer;