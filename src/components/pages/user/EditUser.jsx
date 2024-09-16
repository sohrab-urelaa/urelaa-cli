
        import React from "react";
        import PageWrapper, { CustomPageHeader } from "../../common/PageWrapper";
        import useUserFormItems from "./UserHOC/useFormItems";
        import BaseFormComponent from "../../common/BaseFormComponent";
        import {
            GET_USER_BY_ID,
            UPDATE_USER_URL
        } from "../../../helpers/Constant";

        const EditUser = () => {
            const pageHeader = <CustomPageHeader title="Edit User" />;
            const formItems = useUserFormItems();

            const modifyInitialData = (data) => {
                data.role = data.role?.alias;
                return data;
            };

            return (
                <PageWrapper pageHeader={pageHeader}>
                    <div>
                        <BaseFormComponent
                            formItems={formItems}
                            initialDataUrl={GET_USER_BY_ID}
                            modifyInitialData={modifyInitialData}
                            submitUrl={UPDATE_USER_URL}
                        />
                    </div>
                </PageWrapper>
            );
        };

        export default EditUser;

    