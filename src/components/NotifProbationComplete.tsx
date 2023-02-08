import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { Badge } from "@mui/material";

function NotifProbationComplete() {
  const companyId = useAppSelector((state) => state.auth.companyId);

  const [data, setData] = useState<{ emp: any[] }>({
    emp: [],
  });

  useEffect(() => {
    const sse = new EventSource(
      `http://localhost:3001/api/notifications/probation-completed/${companyId}`
    );

    function getRealTimeData(data: { emp: any[] }) {
      // process data here
      // then pass it to state to rendered
      console.log("Data: ", data);
      setData(JSON.parse(data.toString()));
    }

    sse.onmessage = (event: any) => {
      getRealTimeData(event.data);
    };

    sse.onerror = () => {
      // error log here
      sse.close();
    };

    return () => {
      sse.close();
    };
  });

  return (
    <>
      {/* <h3>Data Sent From Server</h3>
      {data.emp.map((value: any, index: any) => {
        return (
          <div key={index}>
            <p>{value.id}</p>
          </div>
        );
      })} */}

      {data.emp.length > 0 && (
        <Link to="/hr-dashboard/employees/probation/completed">
          <IconButton color="inherit" sx={{ mr: 1.5 }}>
            <Badge badgeContent={1} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Link>
      )}
    </>
  );
}

export default NotifProbationComplete;
