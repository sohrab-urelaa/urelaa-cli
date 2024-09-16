
       const { UserModel } = require("../models");
        const autoCrud = require("./auto-crud/auto-crud");
        const errorHandler = require("../utils/errors/app-errors");
        const { auth, checkPermission } = require("../middlewares");
        const { BaseRepository } = require("../repository");
        const { getQueryParams } = require("../repository/common");
        const { BaseService } = require("../services");

        module.exports = async (app) => {
            const userService = new BaseService({
                Model: UserModel,
                repository: new BaseRepository(UserModel),
                errorHandler,
                modelName: "user",
                sortWhenGetAll: { serial: 1 },
                actions: {
                   
                },
            });

            autoCrud(app, {
                path: "user",
                mode: "CRpSpUD",
                service: userService,
                auth,
                checkPermission,
                permissionString: "",
            });
        };

   
   