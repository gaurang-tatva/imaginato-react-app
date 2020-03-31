import React from "react";
import { Provider } from "react-redux";
import Order from "../../Components/Orders/Order";
import renderer from "react-test-renderer";
import { store } from "../../Redux/Store";
import orderData from './../../fixture/orders.json'

describe("Order Component", () => {
  it("should render without throwing an error", async () => {
    const rendered = renderer.create(
      <Provider dispatch={jest.fn} store={store}>
        <Order  orderData={orderData} handleViewMore={jest.fn} />
      </Provider>
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
