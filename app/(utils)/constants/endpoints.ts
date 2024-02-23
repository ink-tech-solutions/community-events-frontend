const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const loginEndPoint = `${baseUrl}/auth/login`;

export const signUpEndPoint = `${baseUrl}/auth/signup`;

export const verifyTokenEndPoint = `${baseUrl}/auth/verify?token=`;

export const passwordResetRequestEndPoint = `${baseUrl}/auth/password_reset_request`;

export const verifyPasswordResetTokenEndPoint = `${baseUrl}/auth/reset_password?token=`;

export const changePasswordEndPoint = `${baseUrl}/auth/change_password`;
