import { lazy } from "react";
import Permission from "../helpers/Permission";
import * as PATH from "./Slugs";
        
        const UserListView = lazy(() =>
            import("../components/pages/user/UserListView")
        );
        const AddUser = lazy(() =>
            import("../components/pages/user/AddUser")
        );
        const EditUser = lazy(() =>
            import("../components/pages/user/EditUser")
        );
        

        //ROUTE_IMPORTS_AREA
    
const AppRoutes = [
    // department
        
        {
            path: PATH.USER_LIST_PATH,
            exact: true,
            isPrivate: false,
            component: UserListView,
            permissions: [Permission.ALL],
        },
        {
            path: PATH.ADD_USER_PATH,
            exact: true,
            isPrivate: false,
            component: AddUser,
            permissions: [Permission.ALL],
        },
        {
            path: `${PATH.EDIT_USER_PATH}/:id`,
            exact: true,
            isPrivate: false,
            component: EditUser,
            permissions: [Permission.ALL],
        },
        

        //ROUTE_DECLARATION_AREA
    
];
export default AppRoutes;
