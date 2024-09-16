
        import React from "react";
        import PageWrapper, { CustomPageHeader } from "../../common/PageWrapper";
        import useUserFormItems from "./UserHOC/useFormItems";
        import BaseFormComponent from "../../common/BaseFormComponent";
        import { CREATE_USER_URL } from "../../../helpers/Constant";

        const AddUser = () => {
            const pageHeader = <CustomPageHeader title="Add new User" />;

            const formItems = useUserFormItems();

            return (
                <PageWrapper pageHeader={pageHeader}>
                    <div>
                        <BaseFormComponent
                            formItems={formItems}
                            submitUrl={CREATE_USER_URL}
                        />
                    </div>
                </PageWrapper>
            );
        };

        export default AddUser;

    