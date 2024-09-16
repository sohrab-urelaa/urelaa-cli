
        const mongoose = require("mongoose")
        const Schema = mongoose.Schema
        const UserSchema = new Schema(
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
        module.exports = mongoose.model("User", UserSchema)
    