
            import React from "react";
            import TableActionButtons from "../../../common/TablesActionButtons";
            import { IMAGE_URL,DELETE_USER_URL } from "../../../../helpers/Constant";
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
                        render: (e) => <Image width={150} src={`${IMAGE_URL}/${e}`} />
                    },
                    {
                        title: "",
                        key: "action",
                        fixed: "right",
                        width: screenType.isDesktop ? 90 : 65,
                        render: (e) => (
                            <TableActionButtons
                                data={e}
                                deleteUrl={DELETE_USER_URL}
                                moduleName="User"
                                callback={props.callback}
                            />
                        )
                    }
                ];
            };

            export default useColumns;
    