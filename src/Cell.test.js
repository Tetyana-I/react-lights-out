// function Cell({ flipCellsAround, isLit, x, y }) {
//     const classes = `Cell ${isLit ? "Cell-lit" : ""}`;
//     function flipCellsAroundMe() {
//       flipCellsAround(x,y);
//     }
//     return <td className={classes} onClick={flipCellsAroundMe} />;
//   }

import { render } from "@testing-library/react";
import Cell from "./Cell";

// smoke test
it("renders without crashing", function() {
  render(<Cell />);
});
