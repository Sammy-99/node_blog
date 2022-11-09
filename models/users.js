const conn = require("../dbConfig");

const userSchema = conn.mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: Number,
    status: Number,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

module.exports = conn.mongoose.model("users", userSchema);
