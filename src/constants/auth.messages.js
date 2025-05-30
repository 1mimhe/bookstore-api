module.exports = Object.freeze({
    UserAlreadyExists: "User with these identifiers (username/phoneNumber/email) is already exists.",
    UserCreated: "User created successfully.",
    InvalidCredentials: "Invalid User credentials.",
    UserLoginSuccessfully: "User login successfully.",
    AccessTokenRefreshed: "Access Token refreshed successfully.",
    InvalidRefreshToken: "Invalid refresh token. Login first.",
    InvalidToken: "Invalid or refresh token.",
    UserAlreadyAuthorized: "User already authorized. Logout first or refresh token.",
    UserNotAuthorized: "User unauthorized. Login first.",
    UserLoggedOut: "User logged out successfully.",
    MissingAccessToken: "Access token is required but was not provided. Please include a valid access token in the request headers.",
    AccessDenied: "Access Denied: You do not have the required permissions to perform this action.",
});