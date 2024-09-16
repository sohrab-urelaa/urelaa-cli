const ora = require("ora");
const fs = require("fs");

function getRouteContent(
    moduleName,
    firstLetterSmallCaseModuleName,
    camelCaseModuleName,
    smallLeterModuleName
) {
    const modelName = `${camelCaseModuleName}Model`;
    const serviceName = `${firstLetterSmallCaseModuleName}Service`;
    const content = `
       const { ${modelName} } = require("../models");
        const autoCrud = require("./auto-crud/auto-crud");
        const errorHandler = require("../utils/errors/app-errors");
        const { auth, checkPermission } = require("../middlewares");
        const { BaseRepository } = require("../repository");
        const { getQueryParams } = require("../repository/common");
        const { BaseService } = require("../services");

        module.exports = async (app) => {
            const ${serviceName} = new BaseService({
                Model: ${modelName},
                repository: new BaseRepository(${modelName}),
                errorHandler,
                modelName: "${firstLetterSmallCaseModuleName}",
                sortWhenGetAll: { serial: 1 },
                actions: {
                   
                },
            });

            autoCrud(app, {
                path: "${firstLetterSmallCaseModuleName}",
                mode: "CRpSpUD",
                service: ${serviceName},
                auth,
                checkPermission,
                permissionString: "",
            });
        };

   
   `;

    return content;
}

class BackendModuleManager {
    constructor(moduleName) {
        this.moduleName = moduleName;
    }
    create() {
        this.modifyModuleName();
        this.createModelFile();
        this.updateModelImport();
        this.createRouteFile();
        this.appendRouteToIndex();
    }

    delete() {
        this.modifyModuleName();
        this.deleteModelFile();

        this.removeModelImport();
        this.deleteRouteFile();
        this.removeRouteFromIndex();
    }
    removeModelImport = () => {
        const spinner = ora(
            `Deleting Module Import ${this.camelCaseModuleName}`
        ).start();
        const indexPath = "./src/models/index.js";
        const indexContent = fs.readFileSync(indexPath, "utf8");
        // Find the line containing the model import
        const modelImportRegex = new RegExp(
            `${this.camelCaseModuleName}Model:\\s*require\\("./${this.camelCaseModuleName}"\\),?`
        );
        const updatedIndexContent = indexContent.replace(modelImportRegex, "");

        // Remove trailing comma if it's the last item in the object
        const cleanedContent = updatedIndexContent.replace(/,\s*}/, "}");

        // Remove empty lines
        const finalContent = cleanedContent.replace(/^\s*[\r\n]/gm, "");

        if (fs.existsSync(indexPath)) {
            fs.writeFileSync(indexPath, finalContent);
            spinner.succeed(`${this.camelCaseModuleName} Model Import Deleted`);
        } else {
            spinner.fail(`${this.camelCaseModuleName} Model Import Not Found`);
        }
    };
    deleteModelFile = () => {
        const modelPath = `./src/models/${this.camelCaseModuleName}.js`;
        const spinner = ora(
            `Deleting ${this.camelCaseModuleName} Model`
        ).start();
        if (fs.existsSync(modelPath)) {
            fs.unlinkSync(modelPath);
            spinner.succeed(`${this.camelCaseModuleName} Model Deleted`);
        } else {
            spinner.fail(`${this.camelCaseModuleName} Model Not Found`);
        }
    };
    deleteRouteFile = () => {
        const spinner = ora(
            `Deleting ${this.camelCaseModuleName} Route`
        ).start();
        const routePath = `./src/routers/${this.firstLetterSmallCaseModuleName}.js`;
        if (fs.existsSync(routePath)) {
            fs.unlinkSync(routePath);
            spinner.succeed(`${this.camelCaseModuleName} Route Deleted`);
        } else {
            spinner.fail(`${this.camelCaseModuleName} Route Not Found`);
        }
    };

    modifyModuleName = () => {
        const smallLeterModuleName = this.moduleName
            .split(" ")
            .map((item) => item.toLowerCase())
            .join("-");
        const moduleNames = this.moduleName.split(" ");
        const camelCaseModuleName = moduleNames
            .map((item, index) => {
                return item.charAt(0).toUpperCase() + item.slice(1);
            })
            .join("");

        const firstLetterSmallCaseModuleName = moduleNames.map(
            (item, index) => {
                if (index === 0) {
                    return item.charAt(0).toLowerCase() + item.slice(1);
                }
                return item.charAt(0).toUpperCase() + item.slice(1);
            }
        );
        this.smallLeterModuleName = smallLeterModuleName;
        this.camelCaseModuleName = camelCaseModuleName;
        this.firstLetterSmallCaseModuleName = firstLetterSmallCaseModuleName;
    };
    appendRouteToIndex = () => {
        const spinner = ora(
            `Appending Route to Index ${this.camelCaseModuleName}`
        ).start();

        const expressAppPath = "./src/express-app.js";
        if (fs.existsSync(expressAppPath)) {
            const expressAppContent = fs.readFileSync(expressAppPath, "utf8");
            // Import the new module
            const importStatement = `const ${this.firstLetterSmallCaseModuleName} = require("./routers/${this.firstLetterSmallCaseModuleName}");\n`;
            const updatedImportArea = expressAppContent.replace(
                /\/\/IMPORT MODULES AREA/,
                `${importStatement}\n//IMPORT MODULES AREA\n`
            );

            // Include the new route
            const routeStatement = `    ${this.firstLetterSmallCaseModuleName}(app),\n`;
            const updatedRouteArea = updatedImportArea.replace(
                /\/\/INCLUDE ROUTES AREA/,
                `${routeStatement}\n//INCLUDE ROUTES AREA\n`
            );

            fs.writeFileSync(expressAppPath, updatedRouteArea);
            spinner.succeed(
                `${this.camelCaseModuleName} Route appended to express-app.js`
            );
        } else {
            spinner.fail(`Express App Not Found`);
        }
    };
    removeRouteFromIndex = () => {
        const spinner = ora(
            `Removing Route from Index ${this.camelCaseModuleName}`
        ).start();
        const expressAppPath = "./src/express-app.js";
        if (fs.existsSync(expressAppPath)) {
            const expressAppContent = fs.readFileSync(expressAppPath, "utf8");

            // Remove the import statement for the module
            const importStatement = `const ${this.firstLetterSmallCaseModuleName} = require("./routers/${this.firstLetterSmallCaseModuleName}");\n`;
            const updatedImportArea = expressAppContent.replace(
                importStatement,
                ""
            );
            const routeStatement = `    ${this.firstLetterSmallCaseModuleName}(app),\n`;
            const updatedRouteArea = updatedImportArea.replace(
                `${routeStatement}`,
                ""
            );
            fs.writeFileSync(expressAppPath, updatedRouteArea);
            spinner.succeed(
                `${this.camelCaseModuleName} Route Removed from express-app.js`
            );
        } else {
            spinner.fail(`Express App Not Found`);
        }
    };
    createModelFile = () => {
        const spinner = ora(
            `Creating ${this.camelCaseModuleName} Model`
        ).start();
        const modelPath = `./src/models/${this.camelCaseModuleName}.js`;
        const modelContent = `
        const mongoose = require("mongoose")
        const Schema = mongoose.Schema
        const ${this.camelCaseModuleName}Schema = new Schema(
            {
                createdBy:{
                    type:  mongoose.Schema.Types.ObjectId,
                    ref:'User'
                },
            },
            {
                timestamps: true
            }
        )
        module.exports = mongoose.model("${this.camelCaseModuleName}", ${this.camelCaseModuleName}Schema)
    `;
        fs.writeFileSync(modelPath, modelContent);
        spinner.succeed(`${this.camelCaseModuleName} Model Created`);
    };

    updateModelImport = () => {
        const spinner = ora(
            `Updating Model Import ${this.camelCaseModuleName}`
        ).start();

        const indexPath = "./src/models/index.js";
        const indexContent = fs.readFileSync(indexPath, "utf8");
        const updatedIndexContent = indexContent.replace(
            /module\.exports = {/,
            `module.exports = {
    ${this.camelCaseModuleName}Model: require("./${this.camelCaseModuleName}"),`
        );
        fs.writeFileSync(indexPath, updatedIndexContent);
        spinner.succeed(`${this.camelCaseModuleName} Model Import Updated`);
    };

    createRouteFile = () => {
        const spinner = ora(
            `Creating ${this.camelCaseModuleName} Route`
        ).start();
        const routePath = `./src/routers/${this.firstLetterSmallCaseModuleName}.js`;
        const routeContent = getRouteContent(
            this.moduleName,
            this.firstLetterSmallCaseModuleName,
            this.camelCaseModuleName,
            this.smallLeterModuleName
        );
        fs.writeFileSync(routePath, routeContent);
        spinner.succeed(`${this.camelCaseModuleName} Route Created`);
    };
}

module.exports = BackendModuleManager;
