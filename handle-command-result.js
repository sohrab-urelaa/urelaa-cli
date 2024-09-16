const BackendModuleManager = require("./backend-module-manager");
const inquirer = require("inquirer");
const FrontendModuleManager = require("./frontend-module-manager");
const BulkModuleHandler = require("./bulk-module-handler");
const askForModuleName = (moduleType, cb) => {
    const prompt = inquirer.createPromptModule();

    const moduleName =
        moduleType === "bm" ? "Backend Module" : "Frontend Module";

    prompt([
        {
            type: "input",
            name: "moduleName",
            message: `Enter the name of the ${moduleName}:`,
        },
    ]).then((answers) => {
        const { moduleName } = answers;
        cb(moduleName);
    });
};

const askForBackendModuleName = (moduleType, cb) => {
    const prompt = inquirer.createPromptModule();

    const moduleName =
        moduleType === "bm" ? "Backend Module" : "Frontend Module";

    prompt([
        {
            type: "input",
            name: "moduleName",
            message: `Enter the name of the ${moduleName}:`,
        },
        {
            type: "input",
            name: "modelProperties",
            message:
                "Enter the model properties (comma-separated)(PropertyName@Type@Required@RefModel):",
            validate: function (value) {
                if (value.trim() === "") {
                    return "Please enter at least one property.";
                }
                return true;
            },
        },
    ]).then((answers) => {
        const { moduleName, modelProperties } = answers;
        cb(moduleName, modelProperties);
    });
};

const askForFileName = (cb) => {
    const prompt = inquirer.createPromptModule();
    prompt([
        {
            type: "input",
            name: "fileName",
            message: "Enter the name of the file:",
        },
    ]).then((answers) => {
        const { fileName } = answers;
        cb(fileName);
    });
};
class CommandResultHandler {
    constructor(command) {
        this.command = command;
    }

    handleDeleteModuleCommand = (argv) => {
        const { type } = argv;
        askForModuleName(type, (moduleName) => {
            if (type === "bm") {
                const deleteBackendModule = new BackendModuleManager(
                    moduleName
                );
                deleteBackendModule.delete();
            } else if (type === "fm") {
                const deleteFrontendModule = new FrontendModuleManager(
                    moduleName
                );
                deleteFrontendModule.deleteModule();
            }
        });
    };
    handleCreateModuleCommand = (argv) => {
        const { type } = argv;
        if (type === "bm") {
            askForBackendModuleName(type, (moduleName, modelProperties) => {
                const properties = modelProperties.split(",");
                console.log(properties);
                const createBackendModule = new BackendModuleManager(
                    moduleName,
                    properties
                );
                createBackendModule.create();
            });
        } else {
            askForModuleName(type, (moduleName) => {
                const createFrontendModule = new FrontendModuleManager(
                    moduleName
                );
                createFrontendModule.createModule();
            });
        }
    };

    handleUploadModuleCommand = (argv) => {
        const { type } = argv;
        askForFileName((fileName) => {
            const bulkModuleHandler = new BulkModuleHandler(fileName, type);
            bulkModuleHandler.start();
        });
    };
    handleDeleteModuleFromFilesCommand = (argv) => {
        const { type } = argv;
        askForFileName((fileName) => {
            const bulkModuleHandler = new BulkModuleHandler(fileName, type);
            bulkModuleHandler.start(false);
        });
    };
    handleRemoveModulesCommand = (argv) => {
        const { type } = argv;
        askForFileName((fileName) => {
            if (type === "bm") {
                const uploadBackendModule = new BackendModuleManager(fileName);
                uploadBackendModule.upload();
            }
        });
    };
}
const commandResultHandler = new CommandResultHandler();

module.exports = commandResultHandler;
