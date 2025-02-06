const autoBind = require("auto-bind");
const AuthService = require("../services/auth.service");
const authMessages = require("../constants/auth.messages");
const cookieNames = require("../constants/cookie.names");
const createHttpError = require("http-errors");

class AuthController {
    #Service;

    constructor() {
        this.#Service = AuthService;
        autoBind(this);
    }

    async registrationUser(req, res, next) {
        try {
            const { username, password, firstName, lastName, phoneNumber, email } = req.body;
            await this.#Service.registrationUser({ username, password, firstName, lastName, phoneNumber, email });

            return res.status(200).json({
                success: true,
                message: authMessages.UserCreated
            });
        } catch (error) {
            next(error);
        }
    }

    async loginUser(req, res, next) {
        try {
            const { identifier, password } = req.body;
            const { accessToken, refreshToken, userId } = await this.#Service.loginUser({ identifier, password });

            if (req.session.refreshToken) {
                throw createHttpError.BadRequest(authMessages.UserAlreadyAuthorized);
            }

            req.session.refreshToken = refreshToken;
            req.session.userId = userId;

            return res.status(201)
                .set("Authorization", `Bearer ${accessToken}`)
                .cookie(cookieNames.RefreshToken, refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    maxAge: 20 * 24 * 3600 * 1000
                })
                .json({
                    success: true,
                    message: authMessages.UserLoginSuccessfully
                });
        } catch (error) {
            next(error);
        }
    }

    async refreshTokens(req, res, next) {
        try {
            const session = req.session;
            const oldRefreshToken = req.cookies?.[cookieNames.RefreshToken];
            const expirationTime = new Date(session.cookie.expires) - Date.now();
            const { accessToken, refreshToken } = await this.#Service.refreshTokens(session, oldRefreshToken, expirationTime);

            return res.set("Authorization", `Bearer ${accessToken}`)
                .cookie(cookieNames.RefreshToken, refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    maxAge: expirationTime
                })
                .json({
                    success: true,
                    message: authMessages.AccessTokenRefreshed
                });
        } catch (error) {
            next(error);
        }
    }

    logoutUser(req, res, next) {
        try {
            if (!req.session?.refreshToken) {
                throw createHttpError.BadRequest(authMessages.UserNotAuthorized);
            }

            req.session.destroy();
            res.clearCookie(cookieNames.RefreshToken);
            res.clearCookie(cookieNames.SessionID);
            return res.json({
                success: true,
                message: authMessages.UserLoggedOut
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();