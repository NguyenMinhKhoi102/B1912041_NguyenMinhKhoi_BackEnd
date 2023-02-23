const ApiError = require("../api-error");
const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");

exports.registration = async (req, res, next) => {
    if (!req.body?.userId) {
        return next(new ApiError(400, "UserId cannot be empty"));
    }
    if (!req.body?.password) {
        return next(new ApiError(400, "Password cannot be empty"));
    }
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.registration(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "Registrated fail")
        );
    }
}
exports.login = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.login(req.body);
        if (!document)
            return res.send({ message: "user invalid" });
        return res.send({ message: `Welcom to ${document.userId}` });
    } catch (error) {
        return next(
            new ApiError(500, "Login fail")
        )
    }
}