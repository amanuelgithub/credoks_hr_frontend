import { MdDashboard, MdGroups } from "react-icons/md";
import { FaBuilding, FaUserTie } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { IoLocationSharp } from "react-icons/io5";

import Dashboard from "../../components/Dashboard/Dashboard";
import MainSection from "../../components/Dashboard/MainSection";
import Sidebar, { SidebarItem } from "../../components/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <Dashboard>
        <Sidebar>
          {[
            {
              icon: <MdDashboard />,
              name: "Dashboard",
              url: "/admin-dashboard",
            },
            {
              icon: <FaBuilding />,
              name: "Companies",
              url: "/admin-dashboard/companies",
            },
            {
              icon: <GrUserManager />,
              name: "Managers",
              url: "/admin-dashboard/managers",
            },
            {
              icon: <FaUserTie />,
              name: "Employees",
              url: "/admin-dashboard/employees",
            },
            {
              icon: <MdGroups />,
              name: "Departments",
              url: "/admin-dashboard/departments",
            },
            {
              icon: <IoLocationSharp />,
              name: "Locations",
              url: "/admin-dashboard/locations",
            },
          ].map((sidebarItem, index) => {
            return (
              <SidebarItem
                key={index}
                icon={sidebarItem.icon}
                name={sidebarItem.name}
                url={sidebarItem.url}
              />
            );
          })}
        </Sidebar>
        <MainSection>
          <Outlet />
          {/* Everything in the MainSection of the Dashboard will be wrapped in this
          component */}
        </MainSection>
      </Dashboard>
    </div>
  );
}

export default AdminDashboard;
