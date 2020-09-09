import React from "react";
import { Avatar, Space } from "antd";
// import { EditOutlined } from "@ant-design/icons";
// import { Link } from "react-router-dom";
import { DefaultProfile } from "../../static/Images";
// const styles = {
//   editIcon: {
//     color: "#40A9FF",
//     backgroundColor: "#91D5FF",
//     marginTop: "30px",
//     marginRight: "30px",
//   },
// };

// const EditIcon = (
//   <Link to="/accountsettings">
//     <Avatar size="small" style={styles.editIcon}>
//       <EditOutlined />
//     </Avatar>
//   </Link>
// );
const ProfileCard = ({ user }) => {
  return (
    <Space size={16}>
      <Avatar size={80} src={DefaultProfile} />

      {/* <Badge count={EditIcon}>
          <Avatar size={120} src={DefaultProfile} />
        </Badge> */}
      <Space direction="vertical">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </Space>
    </Space>
  );
};

export default ProfileCard;
