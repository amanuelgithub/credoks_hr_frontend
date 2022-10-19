import Header from "./Header";

function Dashboard({ children }: { children: any[] }) {
  return (
    <div className="overflow-x-hidden">
      <div className="w-screen h-screen flex justify-between">
        {/* left side */}
        <div className="w-1/6 bg-white overflow-scroll border-r border-gray-200 sidebar">
          {/* <Sidebar /> */}
          {/* sidebars */}
          {children[0]}
        </div>
        {/* right side */}
        <div className="w-5/6 bg-white overflow-y-scroll dashboard-body">
          {/* header */}
          <Header />
          {/* body */}
          {/* <DataTable tableName={tableName} columns={columns} rows={rows} /> */}

          <div className="h-screen">{children[1]}</div>
        </div>
      </div>
      <div className="bg-black text-yellow-500 font-bold text-xs text-center">
        <div>&#169;copyrights Credoks Groups</div>
      </div>
    </div>
  );
}

export default Dashboard;
