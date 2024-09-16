import { PieChartOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import * as PATH from "../routes/Slugs";
import Permission from "./Permission";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";
const SidebarMenus = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    return [
        {
            key: "profile",
            label: "Profile",
            onClick: () => navigate(PATH.PROFILE_PATH),
            icon: <PieChartOutlined />,
            children: null,
            permissions: [Permission.ALL],
        },
        {
            key: "user",
            label: "user",
            onClick: () => navigate(PATH.USER_PATH),
            icon: <PieChartOutlined />,
            children: null,
            permissions: [Permission.ALL]
        },

        //NAVS_EXPORTS_AREA
    
    ];
};
export default SidebarMenus;
