const { ObjectId } = require("mongodb");
class UserService {
    constructor(client) {
        this.User = client.db().collection("users");
    }
    extractConactData(payload) {
        const user = {
            userId: payload.userId,
            password: payload.password,
        };
        // Remove undefined fields
        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        );
        return user;
    }

    async registration(payload) {
        const user = this.extractConactData(payload);
        const result = await this.User.findOneAndUpdate(
            user,
            { $set: {} },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }
    async findByUserId(userId) {
        const user = await this.User.findOne({ userId: userId });
        return user;
    }
    async login(payload) {
        const user = await this.findByUserId(payload.userId);
        if (user.password == payload.password)
            return user;
        return null;
    }
}

module.exports = UserService