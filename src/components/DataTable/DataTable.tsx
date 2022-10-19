import { Link } from "react-router-dom";

function DataTable({
  children,
  tableName,
  columns,
  rows,
  addUrl,
}: {
  children: any;
  tableName: string;
  columns: any[];
  rows: any[];
  addUrl: string;
}) {
  return (
    <div className="flex justify-center h-screen">
      <div className="h-fit m-5 rounded-lg overflow-x-hidden bg-white">
        <div className="flex justify-between items-center p-8 w-full">
          <div className="text-xl font-bold">{tableName}</div>
          <Link to={`${addUrl}`}>
            <button className="px-4 py-1 rounded-full border border-gray-600 text-sm text-blue-600 font-semibold hover:border-blue-600">
              <span>+</span> Add {tableName}
            </button>
          </Link>
        </div>
        <div className="overflow-x-scroll">
          <table className="table-auto min-w-full h-fit">
            <thead className="bg-gray-100">
              {/* select action column */}
              <tr className="text-start border-y-2 border-gray-100">
                <th className="font-semibold text-start px-6 py-1">
                  <input type="checkbox" />
                </th>

                {/* all table columns */}
                {columns.map((column) => {
                  return (
                    <th className=" font-semibold text-start px-6 py-1">
                      {column}
                    </th>
                  );
                })}

                {/* action columns */}
                <th className="font-semibold text-start px-6 py-1"></th>
                <th className="font-semibold text-start px-6 py-1"></th>
              </tr>
            </thead>

            <tbody>
              {/* All Table Rows goes in here */}
              {children}
            </tbody>
          </table>
        </div>
        {/* footer */}
        <div className="flex justify-between p-6">
          <div className="font-semibold">Total: {rows.length}</div>
          <div className="flex justify-center items-center gap-4">
            <div>
              <button
                disabled
                className="font-semibold rounded-full border border-gray-300 hover:border-blue-900 px-5  disabled:bg-gray-500 disabled:text-white disabled:border-blue-900 "
              >
                prev
              </button>
            </div>
            <div>
              <span className="font-semibold">{1}</span>
            </div>
            <div>
              <button className="font-semibold rounded-full border border-gray-300 hover:border-blue-900 px-5  disabled:bg-gray-500 disabled:text-white disabled:border-blue-900 ">
                next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataTable;

export function TableRow({
  children,
  editUrl,
  deleteUrl,
  showDetail,
  id,
}: {
  children: any;
  editUrl: string;
  deleteUrl: string;
  showDetail?: (id: string) => void;
  id: string;
}) {
  const handleShowDetail = (id: string) => {
    if (showDetail !== undefined) {
      showDetail(id);
    }
  };

  return (
    <tr
      className="border-b border-gray-200 hover:cursor-pointer hover:bg-gray-50"
      onClick={() => {
        handleShowDetail(id);
        console.log("clicked id", id);
      }}
    >
      {/* checkbox action */}
      <td className="text-sm text-gray-900 px-6 py-3">
        <input type="checkbox" name="" id="" />
      </td>

      {children}

      {/* action datas */}
      <td className="text-sm text-blue-600 font-semibold px-6 py-2">
        <div>
          <Link to={`${editUrl}/${id}`}>
            <button>Edit</button>
          </Link>
        </div>
      </td>
      <td className="text-sm text-red-600 font-semibold px-6 py-2">
        <div>
          <Link to={`${deleteUrl}/${id}`}>
            <button>Delete</button>
          </Link>
        </div>
      </td>
    </tr>
  );
}

export function TableRowCell({ children }: { children: any }) {
  return <td className="text-sm text-gray-700 px-6 py-4">{children}</td>;
}
