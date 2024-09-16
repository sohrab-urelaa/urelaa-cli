const getUseColumnsHookContent = (
    moduleName,
    firstLetterSmallCaseModuleName,
    camelCaseModuleName,
    fullUpperCaseModuleName
) => {
    const deleteUrl = `DELETE_${fullUpperCaseModuleName}_URL`;
    const content = `import React from "react";
import TableActionButtons from "../../../common/TablesActionButtons";
import { IMAGE_URL, ${deleteUrl} } from "../../../../helpers/Constant";
import { useCheckScreenType } from "../../../common/useCheckScreenType";
import { Image } from "antd";

const useColumns = (props) => {
    const screenType = useCheckScreenType();

    return [
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            width: 150,
            render: (e) => <Image width={150} src={\`\${IMAGE_URL}/\${e}\`} />
        },
        {
            title: "",
            key: "action",
            fixed: "right",
            width: screenType.isDesktop ? 90 : 65,
            render: (e) => (
                <TableActionButtons
                    data={e}
                    deleteUrl={${deleteUrl}}
                    moduleName="${firstLetterSmallCaseModuleName}"
                    callback={props.callback}
                />
            )
        }
    ];
};

export default useColumns;`;

    return content;
};

const getUseFilterHookContent = (
    moduleName,
    firstLetterSmallCaseModuleName,
    camelCaseModuleName,
    fullUpperCaseModuleName
) => {
    const content = `const useFilterItems = () => {
const filterItems = [
    {
        label: "Caption",
        name: "caption",
        placeholder: "e.g. Abdur Rahim",
        className: "col-span-6 md:col-span-4"
    },
    {
        label: "Title",
        name: "title",
        placeholder: "e.g. Give value here",
        className: "col-span-6 md:col-span-4"
    },
    {
        label: "Description",
        name: "description",
        placeholder: "e.g. Give value here",
        className: "col-span-6 md:col-span-4"
    }
];

    return filterItems;
};

export default useFilterItems;`;

    return content;
};

const getUseFormItemsHookContent = (
    moduleName,
    firstLetterSmallCaseModuleName,
    camelCaseModuleName,
    fullUpperCaseModuleName
) => {
    const content = `import { UPLOAD_IMAGE_URL } from "../../../../helpers/Constant";
const useFormItems = (fileList) => {
    const formItems = [
        {
            label: "Image",
            name: "image",
            className: "col-span-12",
            type: "image",
            limit: 1,
            fileList: fileList ?? [],
            uploadUrl: UPLOAD_IMAGE_URL
        },
        {
            label: "Title",
            name: "title",
            className: "col-span-6"
        },
        {
            label: "Caption",
            name: "caption",
            className: "col-span-6"
        },
        {
            label: "Serial",
            name: "serial",
            type: "number",
            className: "col-span-6"
        },
        {
            label: "Schema",
            name: "schema",
            className: "col-span-12",
            placeholder: "",
            type: "textarea"
        }
    ];

    return formItems;
};

export default useFormItems;`;

    return content;
};

const getAddModuleContent = (
    moduleName,
    firstLetterSmallCaseModuleName,
    camelCaseModuleName,
    fullUpperCaseModuleName
) => {
    const hocFolderName = `${camelCaseModuleName}HOC`;
    const content = `import React from "react";
import PageWrapper, { CustomPageHeader } from "../../common/PageWrapper";
import use${camelCaseModuleName}FormItems from "./${hocFolderName}/useFormItems";
import BaseFormComponent from "../../common/BaseFormComponent";
import { CREATE_${fullUpperCaseModuleName}_URL } from "../../../helpers/Constant";

const Add${camelCaseModuleName} = () => {
    const pageHeader = <CustomPageHeader title="Add new ${firstLetterSmallCaseModuleName}" />;

    const formItems = use${camelCaseModuleName}FormItems();

    return (
        <PageWrapper pageHeader={pageHeader}>
            <div>
                <BaseFormComponent
                    formItems={formItems}
                    submitUrl={CREATE_${fullUpperCaseModuleName}_URL}
                />
            </div>
        </PageWrapper>
    );
};

export default Add${camelCaseModuleName};`;

    return content;
};

const getEditModuleContent = (
    moduleName,
    firstLetterSmallCaseModuleName,
    camelCaseModuleName,
    fullUpperCaseModuleName
) => {
    const hocFolderName = `${camelCaseModuleName}HOC`;
    const content = `import React from "react";
import PageWrapper, { CustomPageHeader } from "../../common/PageWrapper";
import use${camelCaseModuleName}FormItems from "./${hocFolderName}/useFormItems";
import BaseFormComponent from "../../common/BaseFormComponent";
import {GET_${fullUpperCaseModuleName}_BY_ID, UPDATE_${fullUpperCaseModuleName}_URL} from "../../../helpers/Constant";

const Edit${camelCaseModuleName} = () => {
    const pageHeader = <CustomPageHeader title="Edit ${firstLetterSmallCaseModuleName}" />;
    const formItems = use${camelCaseModuleName}FormItems();

    const modifyInitialData = (data) => {
        data.role = data.role?.alias;
        return data;
    };

    return (
        <PageWrapper pageHeader={pageHeader}>
            <div>
                <BaseFormComponent
                    formItems={formItems}
                    initialDataUrl={GET_${fullUpperCaseModuleName}_BY_ID}
                    modifyInitialData={modifyInitialData}
                    submitUrl={UPDATE_${fullUpperCaseModuleName}_URL}
                />
            </div>
        </PageWrapper>
    );
};

export default Edit${camelCaseModuleName};`;

    return content;
};

const getListViewContent = (
    moduleName,
    firstLetterSmallCaseModuleName,
    camelCaseModuleName,
    fullUpperCaseModuleName
) => {
    const hocFolderName = `${camelCaseModuleName}HOC`;
    const content = `import React from "react";
import PageWrapper, { CustomPageHeader } from "../../common/PageWrapper";
import { Button } from "antd";
import use${camelCaseModuleName}Columns from "./${hocFolderName}/useColumns";
import BaseTable from "../../common/BaseTable";
import BaseFilterComponent from "../../common/BaseFilterComponent";
import use${camelCaseModuleName}FilterItems from "./${hocFolderName}/useFilterItems";
import {
    ADD_${fullUpperCaseModuleName}_PATH, ${fullUpperCaseModuleName}_LIST_PATH} from "../../../routes/Slugs";
import { useGetAllData } from "../../common/useGetAllData";
import { GET_ALL_${fullUpperCaseModuleName} } from "../../../helpers/Constant";
import { Link } from "react-router-dom";
import { scrollConfig } from "../../../helpers/Utils";

const ${camelCaseModuleName}ListView = () => {
    const { dataList, loadingList, totalElements, getAllData } =
            useGetAllData(GET_ALL_${fullUpperCaseModuleName});

    const columns = use${camelCaseModuleName}Columns({ callback: getAllData });

    const pageHeader = (
        <CustomPageHeader
            title="${firstLetterSmallCaseModuleName} list"
            extra={[
                <Link key="add-${firstLetterSmallCaseModuleName}" to={ADD_${fullUpperCaseModuleName}_PATH}>
                    <Button key="add-button" type="primary">
                        Add ${firstLetterSmallCaseModuleName}
                    </Button>
                </Link>
            ]}
        />
    );

    return (
        <PageWrapper pageHeader={pageHeader}>
            <div>
                <BaseFilterComponent
                    title="Search ${firstLetterSmallCaseModuleName}"
                    itemCount={totalElements}
                    searchAction={getAllData}
                    filterItems={use${camelCaseModuleName}FilterItems()}
                    currentPath={${fullUpperCaseModuleName}_LIST_PATH}
                />

                <BaseTable
                    columns={columns}
                    dataSource={dataList}
                    loading={loadingList}
                    totalElements={totalElements}
                    currentPath={${fullUpperCaseModuleName}_LIST_PATH}
                    scroll={scrollConfig}
                />
            </div>
        </PageWrapper>
    );
};

export default ${camelCaseModuleName}ListView;`;

    return content;
};

const getConstantContent = (
    moduleName,
    firstLetterSmallCaseModuleName,
    camelCaseModuleName,
    fullUpperCaseModuleName
) => {
    const content = `// ${firstLetterSmallCaseModuleName}\n
export const GET_ALL_${fullUpperCaseModuleName} = \`\${API_URL}/${firstLetterSmallCaseModuleName}\`;
export const GET_${fullUpperCaseModuleName}_BY_ID = \`\${API_URL}/${firstLetterSmallCaseModuleName}/id\`;
export const CREATE_${fullUpperCaseModuleName}_URL = \`\${API_URL}/${firstLetterSmallCaseModuleName}/create\`;
export const UPDATE_${fullUpperCaseModuleName}_URL = \`\${API_URL}/${firstLetterSmallCaseModuleName}/update\`;
export const DELETE_${fullUpperCaseModuleName}_URL = \`\${API_URL}/${firstLetterSmallCaseModuleName}/delete\`;
// CONSTANT_EXPORTS_AREA`;

    return content;
};

const getNavsContent = (
    moduleName,
    firstLetterSmallCaseModuleName,
    camelCaseModuleName,
    fullUpperCaseModuleName
) => {
    const content = `
    {
            key: "${firstLetterSmallCaseModuleName}",
            label: "${firstLetterSmallCaseModuleName}",
            onClick: () => navigate(PATH.${fullUpperCaseModuleName}_LIST_PATH),
            icon: <PieChartOutlined />,
            children: null,
            permissions: [Permission.ALL]
        }, // NAVS_EXPORTS_AREA`;

    return content;
};

const getRouteImportsContent = (
    moduleName,
    firstLetterSmallCaseModuleName,
    camelCaseModuleName,
    fullUpperCaseModuleName,
    smallLeterUnderscoreModuleName
) => {
    const content = `const ${camelCaseModuleName}ListView = lazy(() =>
    import("../components/pages/${smallLeterUnderscoreModuleName}/${camelCaseModuleName}ListView")
);
const Add${camelCaseModuleName} = lazy(() =>
    import("../components/pages/${smallLeterUnderscoreModuleName}/Add${camelCaseModuleName}")
);
const Edit${camelCaseModuleName} = lazy(() =>
    import("../components/pages/${smallLeterUnderscoreModuleName}/Edit${camelCaseModuleName}")
);
// ROUTE_IMPORTS_AREA`;

    return content;
};

const getRouteDeclarationContent = (
    moduleName,
    firstLetterSmallCaseModuleName,
    camelCaseModuleName,
    fullUpperCaseModuleName,
    smallLeterUnderscoreModuleName
) => {
    const content = `
    {
        path: PATH.${fullUpperCaseModuleName}_LIST_PATH,
        exact: true,
        isPrivate: false,
        component: ${camelCaseModuleName}ListView,
        permissions: [Permission.ALL],
    },
    {
        path: PATH.ADD_${fullUpperCaseModuleName}_PATH,
        exact: true,
        isPrivate: false,
        component: Add${camelCaseModuleName},
        permissions: [Permission.ALL],
    },
    {
        path: \`\${PATH.EDIT_${fullUpperCaseModuleName}_PATH}/:id\`,
        exact: true,
        isPrivate: false,
        component: Edit${camelCaseModuleName},
        permissions: [Permission.ALL],
    },
    \n
    // ROUTE_DECLARATION_AREA`;

    return content;
};

const getSlugContent = (
    moduleName,
    firstLetterSmallCaseModuleName,
    camelCaseModuleName,
    fullUpperCaseModuleName,
    smallLeterUnderscoreModuleName
) => {
    const content = `// ${firstLetterSmallCaseModuleName}\n
export const ${fullUpperCaseModuleName}_LIST_PATH = \`\${ROOT_PATH}${firstLetterSmallCaseModuleName}-list\`;
export const ADD_${fullUpperCaseModuleName}_PATH = \`\${ROOT_PATH}add-${firstLetterSmallCaseModuleName}\`;
export const EDIT_${fullUpperCaseModuleName}_PATH = \`\${ROOT_PATH}edit-${firstLetterSmallCaseModuleName}\`;
// SLUGS_EXPORTS_AREA`;

    return content;
};

module.exports = {
    getUseColumnsHookContent,
    getUseFilterHookContent,
    getUseFormItemsHookContent,
    getAddModuleContent,
    getEditModuleContent,
    getListViewContent,
    getConstantContent,
    getNavsContent,
    getRouteImportsContent,
    getRouteDeclarationContent,
    getSlugContent,
};
