const {
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
} = require("./frontend-content");
const ora = require("ora");
const fs = require("fs");

class FrontendModuleManager {
    constructor(moduleName) {
        this.moduleName = moduleName;
    }

    createModule() {
        this.modifyModuleName();
        this.createModuleFolder();
        this.createHOCFolder();
        this.createHOCFile();
        this.modifyConstantFile();
        this.modifyNavsFile();
        this.modifyRouteImportsFile();
        this.modifyRouteDeclarationArea();
        this.modifySlugFile();
    }

    deleteModule = () => {
        this.modifyModuleName();
        this.removeModuleFolder();
        this.removeExportsFromConstantFile();
        this.removeNavsFromNavsFile();
        this.removeRouteImportsFromRouteImportsFile();
        this.removeRouteDeclarationArea();
        this.removeSlugFromSlugFile();
    };
    removeModuleFolder = () => {
        const modulePath = `./src/components/pages/${this.smallLeterUnderscoreModuleName}`;
        const spinner = ora(
            `Removing Module Folder ${this.moduleName}`
        ).start();
        if (fs.existsSync(modulePath)) {
            fs.rmSync(modulePath, { recursive: true });
            spinner.succeed("Module Folder Removed");
        } else {
            spinner.fail("Module Folder Not Found");
        }
    };
    createModuleFolder = () => {
        const modulePath = `./src/components/pages/${this.smallLeterUnderscoreModuleName}`;
        this.moduleFolderPath = modulePath;
        const spinner = ora(
            `Creating Module Folder ${this.moduleName}`
        ).start();
        if (!fs.existsSync(modulePath)) {
            fs.mkdirSync(modulePath);
            spinner.succeed("Module Folder Created");
        } else {
            spinner.fail("Module Folder Already Exists");
        }
    };

    createHOCFolder = () => {
        this.hocFolderPath = `${this.moduleFolderPath}/${this.camelCaseModuleName}HOC`;
        const spinner = ora(`Creating HOC Folder ${this.moduleName}`).start();
        if (!fs.existsSync(this.hocFolderPath)) {
            fs.mkdirSync(this.hocFolderPath);
            spinner.succeed("HOC Folder Created");
        } else {
            spinner.fail("HOC Folder Already Exists");
        }
    };

    createHOCFile = () => {
        //create useColumns.js
        const useColumnsPath = `${this.hocFolderPath}/useColumns.js`;
        const spinner = ora(`Creating HOC File ${this.moduleName}`).start();
        if (!fs.existsSync(useColumnsPath)) {
            const useColumnsContent = getUseColumnsHookContent(
                this.firstLetterSmallCaseModuleName,
                this.moduleName,
                this.camelCaseModuleName,
                this.fullUpperCaseModuleName
            );

            fs.writeFileSync(useColumnsPath, useColumnsContent);
            spinner.succeed("Use Columns Hook Created");
        } else {
            spinner.fail("Use Columns Hook Already Exists");
        }

        //create useFilter.js
        const useFilterPath = `${this.hocFolderPath}/useFilter.js`;
        const filterSpinner = ora(
            `Creating Use Filter Hook ${this.moduleName}`
        ).start();
        if (!fs.existsSync(useFilterPath)) {
            const useFilterContent = getUseFilterHookContent(
                this.firstLetterSmallCaseModuleName,
                this.moduleName,
                this.camelCaseModuleName,
                this.fullUpperCaseModuleName
            );

            fs.writeFileSync(useFilterPath, useFilterContent);
            filterSpinner.succeed("Use Filter Hook Created");
        } else {
            filterSpinner.fail("Use Filter Hook Already Exists");
        }

        //create use form items hooks
        const useFormItemsPath = `${this.hocFolderPath}/useFormItems.jsx`;
        const useFormItemsSpinner = ora(
            `Creating Use Form Items Hook ${this.moduleName}`
        ).start();
        if (!fs.existsSync(useFormItemsPath)) {
            const useFormItemsContent = getUseFormItemsHookContent(
                this.firstLetterSmallCaseModuleName,
                this.moduleName,
                this.camelCaseModuleName,
                this.fullUpperCaseModuleName
            );

            fs.writeFileSync(useFormItemsPath, useFormItemsContent);
            useFormItemsSpinner.succeed("Use Form Items Hook Created");
        } else {
            useFormItemsSpinner.fail("Use Form Items Hook Already Exists");
        }

        //create AddModule.jsx

        const addModulePath = `${this.moduleFolderPath}/Add${this.camelCaseModuleName}.jsx`;
        const addModuleSpinner = ora(
            `Creating Add Module ${this.moduleName}`
        ).start();
        if (!fs.existsSync(addModulePath)) {
            const addModuleContent = getAddModuleContent(
                this.firstLetterSmallCaseModuleName,
                this.moduleName,
                this.camelCaseModuleName,
                this.fullUpperCaseModuleName
            );

            fs.writeFileSync(addModulePath, addModuleContent);
            addModuleSpinner.succeed("Add Module Created");
        } else {
            addModuleSpinner.fail("Add Module Already Exists");
        }

        //create edit module

        const editModulePath = `${this.moduleFolderPath}/Edit${this.camelCaseModuleName}.jsx`;

        const editModuleSpinner = ora(
            `Creating Edit Module ${this.moduleName}`
        ).start();
        if (!fs.existsSync(editModulePath)) {
            const editModuleContent = getEditModuleContent(
                this.firstLetterSmallCaseModuleName,
                this.moduleName,
                this.camelCaseModuleName,
                this.fullUpperCaseModuleName
            );

            fs.writeFileSync(editModulePath, editModuleContent);
            editModuleSpinner.succeed("Edit Module Created");
        } else {
            editModuleSpinner.fail("Edit Module Already Exists");
        }

        //create list file for list view

        const listPath = `${this.moduleFolderPath}/${this.camelCaseModuleName}ListView.jsx`;

        const listSpinner = ora(
            `Creating List File ${this.moduleName}`
        ).start();
        if (!fs.existsSync(listPath)) {
            const listContent = getListViewContent(
                this.firstLetterSmallCaseModuleName,
                this.moduleName,
                this.camelCaseModuleName,
                this.fullUpperCaseModuleName
            );

            fs.writeFileSync(listPath, listContent);
            listSpinner.succeed("List File Created");
        } else {
            listSpinner.fail("List File Already Exists");
        }
    };

    modifyRouteDeclarationArea = () => {
        const routeDeclarationPath = `./src/routes/AppRoutes.js`;
        const spinner = ora(
            `Modifying Route Declaration Area ${this.moduleName}`
        ).start();
        if (fs.existsSync(routeDeclarationPath)) {
            const content = fs.readFileSync(routeDeclarationPath, "utf8");
            const newContent = content.replace(
                "//ROUTE_DECLARATION_AREA",
                getRouteDeclarationContent(
                    this.moduleName,
                    this.firstLetterSmallCaseModuleName,
                    this.camelCaseModuleName,
                    this.fullUpperCaseModuleName,
                    this.smallLeterUnderscoreModuleName
                )
            );
            fs.writeFileSync(routeDeclarationPath, newContent);
            spinner.succeed("Route Declaration Area Modified");
        } else {
            spinner.fail("Route Declaration Area File Not Found");
        }
    };

    removeRouteDeclarationArea = () => {
        const routeDeclarationPath = `./src/routes/AppRoutes.js`;
        const spinner = ora(
            `Removing Route Declaration Area ${this.moduleName}`
        ).start();
        if (fs.existsSync(routeDeclarationPath)) {
            const content = fs.readFileSync(routeDeclarationPath, "utf8");

            // Define the pattern to match the route declarations for this module
            const routePattern = new RegExp(
                `\\s*{\\s*path:\\s*PATH\\.${this.fullUpperCaseModuleName}_LIST_PATH,\\s*exact:\\s*true,\\s*isPrivate:\\s*false,\\s*component:\\s*${this.camelCaseModuleName}ListView,\\s*permissions:\\s*\\[Permission\\.ALL\\],\\s*},\\s*` +
                    `{\\s*path:\\s*PATH\\.ADD_${this.fullUpperCaseModuleName}_PATH,\\s*exact:\\s*true,\\s*isPrivate:\\s*false,\\s*component:\\s*Add${this.camelCaseModuleName},\\s*permissions:\\s*\\[Permission\\.ALL\\],\\s*},\\s*` +
                    `{\\s*path:\\s*\`\\\${PATH\\.EDIT_${this.fullUpperCaseModuleName}_PATH}/:id\`,\\s*exact:\\s*true,\\s*isPrivate:\\s*false,\\s*component:\\s*Edit${this.camelCaseModuleName},\\s*permissions:\\s*\\[Permission\\.ALL\\],\\s*},`,
                "g"
            );

            // Remove the matching route declarations
            const updatedContent = content.replace(routePattern, "");

            // Remove any empty lines that might have been left
            const cleanedContent = updatedContent.replace(/^\s*[\r\n]/gm, "");

            fs.writeFileSync(routeDeclarationPath, cleanedContent);
            spinner.succeed("Route Declaration Area Removed");
        } else {
            spinner.fail("Route Declaration Area File Not Found");
        }
    };

    modifyRouteImportsFile = () => {
        const routeImportsPath = `./src/routes/AppRoutes.js`;
        const spinner = ora(
            `Modifying Route Imports File ${this.moduleName}`
        ).start();
        if (fs.existsSync(routeImportsPath)) {
            const content = fs.readFileSync(routeImportsPath, "utf8");
            const exportArea = "//ROUTE_IMPORTS_AREA";
            const newExports = getRouteImportsContent(
                this.moduleName,
                this.firstLetterSmallCaseModuleName,
                this.camelCaseModuleName,
                this.fullUpperCaseModuleName,
                this.smallLeterUnderscoreModuleName
            );
            const updatedContent = content.replace(exportArea, newExports);
            fs.writeFileSync(routeImportsPath, updatedContent);
            spinner.succeed("Route Imports File Modified");
        } else {
            spinner.fail("Route Imports File Not Found");
        }
    };

    removeRouteImportsFromRouteImportsFile = () => {
        const routeImportsPath = `./src/routes/AppRoutes.js`;
        const spinner = ora(
            `Removing Route Imports From Route Imports File ${this.moduleName}`
        ).start();
        if (fs.existsSync(routeImportsPath)) {
            const content = fs.readFileSync(routeImportsPath, "utf8");
            // Define the pattern to match the imports for this module
            const importPattern = new RegExp(
                `\\s*const\\s+${this.camelCaseModuleName}ListView\\s*=\\s*lazy\\(\\s*\\(\\)\\s*=>\\s*import\\([^)]+\\)\\s*\\);\\s*` +
                    `const\\s+Add${this.camelCaseModuleName}\\s*=\\s*lazy\\(\\s*\\(\\)\\s*=>\\s*import\\([^)]+\\)\\s*\\);\\s*` +
                    `const\\s+Edit${this.camelCaseModuleName}\\s*=\\s*lazy\\(\\s*\\(\\)\\s*=>\\s*import\\([^)]+\\)\\s*\\);`,
                "g"
            );

            // Remove the matching imports
            const updatedContent = content.replace(importPattern, "");

            // Remove any empty lines that might have been left
            const cleanedContent = updatedContent.replace(/^\s*[\r\n]/gm, "");

            // Write the cleaned content back to the file
            fs.writeFileSync(routeImportsPath, cleanedContent);
            spinner.succeed(
                `Route Imports for ${this.moduleName} removed from AppRoutes.js`
            );
        } else {
            spinner.fail("Route Imports File Not Found");
        }
    };

    modifySlugFile = () => {
        const slugPath = `./src/routes/Slugs.js`;
        const spinner = ora(`Modifying Slug File ${this.moduleName}`).start();
        if (fs.existsSync(slugPath)) {
            const content = fs.readFileSync(slugPath, "utf8");
            const exportArea = "//SLUGS_EXPORTS_AREA";
            const newExports = getSlugContent(
                this.moduleName,
                this.firstLetterSmallCaseModuleName,
                this.camelCaseModuleName,
                this.fullUpperCaseModuleName,
                this.smallLeterUnderscoreModuleName
            );
            const updatedContent = content.replace(exportArea, newExports);
            fs.writeFileSync(slugPath, updatedContent);
            spinner.succeed("Slug File Modified");
        } else {
            spinner.fail("Slug File Not Found");
        }
    };

    removeSlugFromSlugFile = () => {
        const slugPath = `./src/routes/Slugs.js`;
        const spinner = ora(
            `Removing Slug From Slug File ${this.moduleName}`
        ).start();
        if (fs.existsSync(slugPath)) {
            const content = fs.readFileSync(slugPath, "utf8");
            // Define the pattern to match the exports for this module in the Slugs file
            const slugExportPattern = new RegExp(
                `\\s*\\/\\/${this.firstLetterSmallCaseModuleName}\\s*\\n` +
                    `\\s*export const ${this.fullUpperCaseModuleName}_LIST_PATH = \`\\\${ROOT_PATH}${this.firstLetterSmallCaseModuleName}-list\`;\\s*\\n` +
                    `\\s*export const ADD_${this.fullUpperCaseModuleName}_PATH = \`\\\${ROOT_PATH}add-${this.firstLetterSmallCaseModuleName}\`;\\s*\\n` +
                    `\\s*export const EDIT_${this.fullUpperCaseModuleName}_PATH = \`\\\${ROOT_PATH}edit-${this.firstLetterSmallCaseModuleName}\`;\\s*\\n?`,
                "g"
            );
            // Remove the matching exports
            const updatedContent = content.replace(slugExportPattern, "");

            // Remove any empty lines that might have been left
            const cleanedContent = updatedContent.replace(/^\s*[\r\n]/gm, "");

            // Write the cleaned content back to the file
            fs.writeFileSync(slugPath, cleanedContent);
            spinner.succeed(
                `Slug exports for ${this.moduleName} removed from Slugs.js`
            );
        } else {
            spinner.fail("Slug File Not Found");
        }
    };
    modifyNavsFile = () => {
        const navsPath = `./src/helpers/Navs.js`;
        const spinner = ora(`Modifying Navs File ${this.moduleName}`).start();
        if (fs.existsSync(navsPath)) {
            const content = fs.readFileSync(navsPath, "utf8");
            const exportArea = "//NAVS_EXPORTS_AREA";
            const newExports = getNavsContent(
                this.moduleName,
                this.firstLetterSmallCaseModuleName,
                this.camelCaseModuleName,
                this.fullUpperCaseModuleName
            );
            const updatedContent = content.replace(exportArea, newExports);
            fs.writeFileSync(navsPath, updatedContent);
            spinner.succeed("Navs File Modified");
        } else {
            spinner.fail("Navs File Not Found");
        }
    };
    removeNavsFromNavsFile = () => {
        const navsPath = `./src/helpers/Navs.js`;
        const spinner = ora(
            `Removing Navs From Navs File ${this.moduleName}`
        ).start();
        if (fs.existsSync(navsPath)) {
            const content = fs.readFileSync(navsPath, "utf8");
            // Define the pattern to match the exports for this module in the Navs file
            const navExportPattern = new RegExp(
                `\\s*{\\s*key:\\s*"${this.firstLetterSmallCaseModuleName}",[^}]*},?\\s*\\n?`,
                "g"
            );

            // Remove the matching exports
            const updatedContent = content.replace(navExportPattern, "");

            // Remove any empty lines that might have been left
            let cleanedContent = updatedContent.replace(/^\s*[\r\n]/gm, "");

            // Write the cleaned content back to the file
            fs.writeFileSync(navsPath, cleanedContent);
            spinner.succeed("Navs removed from Navs File");
        } else {
            spinner.fail("Navs File Not Found");
        }
    };
    modifyConstantFile = () => {
        const constantPath = `./src/helpers/Constant.js`;
        const spinner = ora(
            `Modifying Constant File ${this.moduleName}`
        ).start();
        if (fs.existsSync(constantPath)) {
            const content = fs.readFileSync(constantPath, "utf8");
            const exportArea = "//CONSTANT_EXPORTS_AREA";
            const newExports = getConstantContent(
                this.moduleName,
                this.firstLetterSmallCaseModuleName,
                this.camelCaseModuleName,
                this.fullUpperCaseModuleName
            );
            const updatedContent = content.replace(exportArea, newExports);
            fs.writeFileSync(constantPath, updatedContent);
            spinner.succeed("Constant File Modified");
        } else {
            spinner.fail("Constant File Not Found");
        }
    };
    removeExportsFromConstantFile = () => {
        const constantPath = `./src/helpers/Constant.js`;
        const spinner = ora(
            `Removing Exports From Constant File ${this.moduleName}`
        ).start();
        if (fs.existsSync(constantPath)) {
            const content = fs.readFileSync(constantPath, "utf8");
            // Define the pattern to match the exports for this module
            const exportPattern = new RegExp(
                `export const (GET_ALL_${this.fullUpperCaseModuleName}|` +
                    `GET_${this.fullUpperCaseModuleName}_BY_ID|` +
                    `CREATE_${this.fullUpperCaseModuleName}_URL|` +
                    `UPDATE_${this.fullUpperCaseModuleName}_URL|` +
                    `DELETE_${this.fullUpperCaseModuleName}_URL) = .*?\n`,
                "g"
            );

            // Remove the matching exports
            const updatedContent = content.replace(exportPattern, "");

            // Remove any empty lines that might have been left
            let cleanedContent = updatedContent.replace(/^\s*[\r\n]/gm, "");
            cleanedContent = cleanedContent.replace(
                `//${this.firstLetterSmallCaseModuleName}`,
                ""
            );
            fs.writeFileSync(constantPath, cleanedContent);
            spinner.succeed("Exports Removed from Constant File");
        } else {
            spinner.fail("Constant File Not Found");
        }
    };

    modifyModuleName = () => {
        const smallLeterModuleName = this.moduleName
            .split(" ")
            .map((item) => item.toLowerCase())
            .join("-");
        const smallLeterUnderscoreModuleName = this.moduleName
            .split(" ")
            .map((item) => item.toLowerCase())
            .join("_");
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
        const fullUpperCaseModuleName = moduleNames.map((item, index) => {
            return item.toUpperCase();
        });
        const fullLowerCaseModuleName = moduleNames.map((item, index) => {
            return item.toLowerCase();
        });
        this.smallLeterModuleName = smallLeterModuleName;
        this.camelCaseModuleName = camelCaseModuleName;
        this.firstLetterSmallCaseModuleName = firstLetterSmallCaseModuleName;
        this.smallLeterUnderscoreModuleName = smallLeterUnderscoreModuleName;
        this.fullUpperCaseModuleName = fullUpperCaseModuleName;
    };
}
module.exports = FrontendModuleManager;
