import { ACTION_TYPE } from "./Actions";

const initialState = {
  orderList: [
    {
      id: "TXT_1",
      name: "Orange Juice",
      price: 15,
      location: "Beijing, China",
      note: "Please add tissue."
    },
    {
      id: "TXT_2",
      name: "Apple Juice",
      price: 15,
      location: "Shanghai, China",
      note: "Please add extra glass"
    },
    {
      id: "TXT_3",
      name: "Banana Shake",
      price: 20,
      location: "Tianjin, China",
      note: "Please add extra spoon."
    },
    {
      id: "TXT_4",
      name: "Carrot Juice",
      price: 15,
      location: "Beijing, China",
      note: "Please add tissue."
    },
    {
      id: "TXT_5",
      name: "Cherry Juice",
      price: 15,
      location: "Shanghai, China",
      note: "Please add extra glass"
    },
    {
      id: "TXT_6",
      name: "Grape Juice",
      price: 20,
      location: "Tianjin, China",
      note: "Please add extra spoon."
    }
  ]
};

/**
 * Order Reducer
 */
const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_ORDERS:
      return {
        ...state,
        orderList: action.orderList
      };
    case ACTION_TYPE.ADD_ORDER:
      return {
        ...state,
        orderList: action.orderList
      };
    case ACTION_TYPE.EDIT_ORDER:
      return {
        ...state,
        orderList: action.orderList
      };
    default:
      return state;
  }
};

export default OrderReducer;
