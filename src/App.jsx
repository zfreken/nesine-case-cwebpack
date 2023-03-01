import { useMemo } from "react";
import BasketState from "./context/basket/state";
import Table from "./component/table";
import Basket from "./component/basket";
import blt from "./data/bulten_data";

import "./styles/app.scss";

function App() {
  const data = useMemo(() => Object.values(blt.Events), []);
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        hideHeader: false,
        columns: [
          {
            Header: `Event Count: ${data.length}`,
            accessor: (row, index) => {
              return `${index+1} - ${row.D} ${row.DAY} ${row.LN}`;
            },
          },
          {
            Header: "-",
            accessor: (row, index) => {
              return `${row.C} ${row.T} ${row.N}`;
            },
          },
          {
            Header: "Yorumlar",
            accessor: "comment",
          },
          {
            Header: "-",
            accessor: "OCG.1.MBS",
          },
          {
            Header: "1",
            accessor: "OCG.1.OC.0.O",
            link: true,
          },
          {
            Header: "X",
            accessor: "OCG.1.OC.1.N",
          },
          {
            Header: "2",
            accessor: "OCG.1.OC.1.O",
						link: true,
          },
          {
            Header: "Alt",
            accessor: "OCG.5.OC.25.O",
            link: true,
          },
          {
            Header: "Üst",
            accessor: "OCG.5.OC.26.O",
            link: true,
          },
          {
            Header: "H1",
            accessor: "h1",
          },
          {
            Header: "1",
            accessor: "1",
          },
          {
            Header: "X",
            accessor: "x",
          },
          {
            Header: "2",
            accessor: "2",
          },
          {
            Header: "H2",
            accessor: "h2",
          },
          {
            Header: "1-X",
            accessor: "OCG.2.OC.3.O",
            link: true,
          },
          {
            Header: "1-2",
            accessor: "OCG.2.OC.4.O",
            link: true,
          },
          {
            Header: "X-2",
            accessor: "OCG.2.OC.5.O",
            link: true,
          },
        ],
      },
    ],
    []
  );

  return (
    <BasketState>
      <div>
        <Table columns={columns} data={data} />
        <Basket />
      </div>
    </BasketState>
  );
}

export default App;
