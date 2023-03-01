import { useContext, useMemo } from "react";
import { useTable, usePagination } from "react-table";
import BasketContext from "../../context/basket";
import { getValueFromKey } from "../../utils/function";
import "./style.scss";

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 50 },
    },
    usePagination
  );

  const { addToCart, basketItems } = useContext(BasketContext);

  const onActionClick = (e, data) => {
    const {
      dataset: { column, action },
    } = e?.target;

    if (action) {
      const columnKey = column.split(".").slice(0, -1).join(".");
      const selectedObj = {
        nid: data[0].row.original.NID,
        rowId: data[0].row.id,
        value: getValueFromKey(data[0]?.row.original, column),
        columnId: column,
        columnKey,
        original: data[0].row.original,
        objInfo: getValueFromKey(data[0]?.row.original, columnKey),
      };
      addToCart(selectedObj);
    }
  };

  const isSelected = useMemo(
    () => (row, column) => {
      const found = basketItems.findIndex(
        (r) => r.rowId === row && r.columnId === column
      );
      return found !== -1;
    },
    [basketItems]
  );

  return (
    <div className="table-responsive">
      <table className="table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) =>
                column.hideHeader === false ? null : (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                )
              )}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={(e) => onActionClick(e, row.cells)}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        backgroundColor: isSelected(cell.row.id, cell.column.id)
                          ? "yellow"
                          : "",
                      }}
                      data-column={cell.column.id}
                      data-action={cell.column.link}
                      className={cell.column.link && "cursor-pointer"}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button
          className="pagination__action"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </button>{" "}
        <button
          className="pagination__action"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </button>
        <span className="pagination__info">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <button
          className="pagination__action"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </button>{" "}
        <button
          className="pagination__action"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>{" "}
        <select
          className="pagination__action"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Table;
