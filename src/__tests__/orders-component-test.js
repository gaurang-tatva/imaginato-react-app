import React from "react";
import { Provider } from "react-redux";
import Orders from "../Container/Orders";
import renderer from "react-test-renderer";
import { store } from "../Redux/Store";

describe("Order Component", () => {
  it("should render without throwing an error", async () => {
    const rendered = renderer.create(
      <Provider dispatch={jest.fn} store={store}>
        <Orders />
      </Provider>
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
