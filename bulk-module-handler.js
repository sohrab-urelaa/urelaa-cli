const BackendModuleManager = require("./backend-module-manager");
const FrontendModuleManager = require("./frontend-module-manager");
const ora = require("ora");
const fs = require("fs");

class BulkModuleHandler {
    constructor(fileName, type) {
        this.fileName = fileName;
        this.type = type;
    }
    start(isUpload = true) {
        const filePath = `./${this.fileName}.json`;
        const spinner = ora("Reading module file").start();
        const fileContent = fs.readFileSync(filePath, "utf8");
        const data = JSON.parse(fileContent);
        data.forEach((element) => {
            const moduleName = element?.moduleName;
            const modelProperties = element?.modelProperties?.split(",");
            const moduleType = element?.moduleType
                ? element?.moduleType
                : this.type;
            if (moduleType === "bm") {
                const moduleGenerator = new BackendModuleManager(
                    moduleName,
                    modelProperties
                );
                if (isUpload) {
                    moduleGenerator.create();
                } else {
                    moduleGenerator.delete();
                }
            } else if (moduleType === "fm") {
                const moduleGenerator = new FrontendModuleManager(
                    moduleName,
                    modelProperties
                );
                if (isUpload) {
                    moduleGenerator.createModule();
                } else {
                    moduleGenerator.deleteModule();
                }
            }
        });

        const fileLength = data.length;
        if (isUpload) {
            spinner.succeed(`${fileLength} Module file uploaded successfully`);
        } else {
            spinner.succeed(`${fileLength} Module file deleted successfully`);
        }
    }
}

module.exports = BulkModuleHandler;
