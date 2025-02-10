module.exports = Object.freeze({
    UserAlreadyExists: "User with these identifiers (username/phoneNumber/email) is already exists.",
    UserCreated: "User created successfully.",
    InvalidCredentials: "Invalid User credentials.",
    UserLoginSuccessfully: "User login successfully.",
    AccessTokenRefreshed: "Access Token refreshed successfully.",
    InvalidRefreshToken: "Invalid refresh token. Authorize first.",
    InvalidAccessToken: "Invalid access token. Refresh it or authorize first.",
    UserAlreadyAuthorized: "User already authorized. Logout first.",
    UserNotAuthorized: "User unauthorized. Login first.",
    UserLoggedOut: "User logged out successfully.",
    MissingAccessToken: "Access token is required but was not provided. Please include a valid access token in the request headers."
});