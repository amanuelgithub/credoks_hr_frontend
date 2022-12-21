import Avatar from "@mui/material/Avatar";

function ProfileAvatar({
  profileImage,
  width = 100,
  height = 100,
}: {
  profileImage?: string;
  width?: any;
  height?: any;
}) {
  return (
    <div>
      {profileImage ? (
        <Avatar
          sx={{ width, height }}
          alt="Amanuel Girma"
          src={`http://localhost:3001/api/employees/profile-images/${profileImage}`}
        />
      ) : (
        <Avatar
          sx={{ width, height }}
          // alt="Profile Avatar"
          src="/images/profileImage.png"
        />
      )}
    </div>
  );
}

export default ProfileAvatar;
