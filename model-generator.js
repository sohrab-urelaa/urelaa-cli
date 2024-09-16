const ModelTypeMap = {
    S: "String",
    N: "Number",
    B: "Boolean",
    D: "Date",
    A: "Array",
    O: "mongoose.Schema.Types.ObjectId",
    F: "Float",
    I: "Integer",
    T: "Text",
};

class ModelGenerator {
    constructor(moduleName, modelProperties = [], moduleGenerator) {
        this.moduleName = moduleName;
        this.modelProperties = modelProperties;
        this.moduleGenerator = moduleGenerator;
    }

    getGeneratedModelContent = () => {
        //model properties formate would be like this 'modelname@S@R@RefModelName'
        //first @S for string
        //second @R for required
        //third @RefModelName for reference model name

        const modelObject = {};

        this.modelProperties.forEach((property) => {
            const [name, type = "String", required = true, refModel] =
                property.split("@");

            modelObject[name] = {
                type: ModelTypeMap[type] || "String",
                required: required === "R",
            };

            if (refModel && type === "O") {
                modelObject[name].ref = refModel;
            }
        });

        const schemaContent = JSON.stringify(modelObject, null, 4)
            .replace(/"String"/g, "String")
            .replace(/"Number"/g, "Number")
            .replace(/"Boolean"/g, "Boolean")
            .replace(/"Date"/g, "Date")
            .replace(/"Array"/g, "Array")
            .replace(/"Object"/g, "Object")
            .replace(/"Float"/g, "Number")
            .replace(/"Integer"/g, "Number")
            .replace(/"Text"/g, "String")
            .replace(
                /"mongoose\.Schema\.Types\.ObjectId"/g,
                "mongoose.Schema.Types.ObjectId"
            );
        const content = `const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ${this.moduleGenerator.camelCaseModuleName}Schema = new Schema(
       ${schemaContent}
    ,
    {
        timestamps: true
    }
)
module.exports = mongoose.model("${this.moduleGenerator.camelCaseModuleName}", ${this.moduleGenerator.camelCaseModuleName}Schema)
        `;
        return content;
    };
}

module.exports = ModelGenerator;
