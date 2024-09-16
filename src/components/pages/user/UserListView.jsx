
        import React from "react";
        import PageWrapper, { CustomPageHeader } from "../../common/PageWrapper";
        import { Button } from "antd";
        import useUserColumns from "./UserHOC/useColumns";
        import BaseTable from "../../common/BaseTable";
        import BaseFilterComponent from "../../common/BaseFilterComponent";
        import useUserFilterItems from "./UserHOC/useFilterItems";
        import {
            ADD_USER_PATH,
            User_LIST_PATH
        } from "../../../routes/Slugs";
        import { useGetAllData } from "../../common/useGetAllData";
        import { GET_ALL_USER } from "../../../helpers/Constant";
        import { Link } from "react-router-dom";
        import { scrollConfig } from "../../../helpers/Utils";

        const UserListView = () => {
            const { dataList, loadingList, totalElements, getAllData } =
                    useGetAllData(GET_ALL_USER);

            const columns = useUserColumns({ callback: getAllData });

            const pageHeader = (
                <CustomPageHeader
                    title="User list"
                    extra={[
                        <Link key="add-User" to={ADD_USER_PATH}>
                            <Button key="add-button" type="primary">
                                Add User
                            </Button>
                        </Link>
                    ]}
                />
            );

            return (
                <PageWrapper pageHeader={pageHeader}>
                    <div>
                        <BaseFilterComponent
                            title="Search User"
                            itemCount={totalElements}
                            searchAction={getAllData}
                            filterItems={useUserFilterItems()}
                            currentPath={USER_LIST_PATH}
                        />

                        <BaseTable
                            columns={columns}
                            dataSource={dataList}
                            loading={loadingList}
                            totalElements={totalElements}
                            currentPath={USER_LIST_PATH}
                            scroll={scrollConfig}
                        />
                    </div>
                </PageWrapper>
            );
        };

        export default UserListView;
    
    