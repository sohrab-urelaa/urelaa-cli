const BackendModuleManager = require("./backend-module-manager");
const inquirer = require("inquirer");
const FrontendModuleManager = require("./frontend-module-manager");
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
        askForModuleName(type, (moduleName) => {
            if (type === "bm") {
                const createBackendModule = new BackendModuleManager(
                    moduleName
                );
                createBackendModule.create();
            } else if (type === "fm") {
                const createFrontendModule = new FrontendModuleManager(
                    moduleName
                );
                createFrontendModule.createModule();
            }
        });
    };
}
const commandResultHandler = new CommandResultHandler();

module.exports = commandResultHandler;
