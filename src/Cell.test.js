import { render } from "@testing-library/react";
import Cell from "./Cell";

// smoke test
it("renders without crashing", function() {
  render(<Cell />);
});


it("contains correct class when cell is lit", function() {
    const { queryByTestId } = render(<Cell x={0} y={0} isLit={true}/>);
    expect(queryByTestId("0-0")).toHaveClass("Cell-lit");
})


it("contains correct class when cell is unlit", function() {
    const { queryByTestId } = render(<Cell x={0} y={1} isLit={false}/>);
    expect(queryByTestId('1-0')).toHaveClass('Cell ');
})