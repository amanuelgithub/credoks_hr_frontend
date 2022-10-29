import { useState } from "react";
import DetailProfile from "./DetailProfile";
import EditProfile from "./EditProfile";

function Profile() {
  const [editing, setEditing] = useState(false);

  const handleEditing = (isEditing: boolean) => {
    setEditing(isEditing);
  };

  return (
    <>
      <EditProfile editing={editing} handleEditing={handleEditing} />
      <DetailProfile editing={editing} handleEditing={handleEditing} />
    </>
  );
}

export default Profile;
