export const CONFIG = {
  qa: {
    API_BASE_URL: "https://easeapi.venturasecurities.uat",
    SSO_BASE_URL: "https://easeapi-sso.venturasecurities.uat",
    EASEAPI_API_KEY: "wpJgFIwyvUVKLylUZtsivcEGZszGRUfqjXUZ4UUTJ4N",
    EASEAPI_SSO_API_KEY: "7LTdYwVYxw6osBZhMxU0R2QYACKu1paY7R5KTbds",

    // API Paths
    GET_PARTNER_APP_INFO: "${API_BASE_URL}/login/v1/get_partner_app_info",
    VALIDATE_USER: "${SSO_BASE_URL}/auth/user/v5/validateuser",
    GET_CAPTCHA: "${SSO_BASE_URL}/auth/user/v5/captcha/get",
    SEND_OTP: "${SSO_BASE_URL}/auth/user/v5/otp/send",
    VALIDATE_OTP: "${SSO_BASE_URL}/auth/user/v5/otp/validate",
    RESEND_OTP: "${SSO_BASE_URL}/auth/user/v5/otp/resend",
    VALIDATE_USER_PAN: "${SSO_BASE_URL}/auth/user/v5/pan/validateuser",
    VALIDATE_PIN: "${SSO_BASE_URL}/auth/user/v5/updatepin",
  },
  prod: {
    API_BASE_URL: "https://easeapi.venturasecurities.com",
    SSO_BASE_URL: "https://easeapi-sso.venturasecurities.com",
    EASEAPI_API_KEY: "wpJgFIwyvUVKLylUZtsivcEGZszGRUfqjXUZ4UUTJ4N",
    EASEAPI_SSO_API_KEY: "zKPcTBkfz32kYCrGIgVfv3PHV1ee2OdG6NOZbryn",

    // API Paths
    GET_PARTNER_APP_INFO: "${API_BASE_URL}/login/v1/get_partner_app_info",
    VALIDATE_USER: "${SSO_BASE_URL}/auth/user/v5/validateuser",
    GET_CAPTCHA: "${SSO_BASE_URL}/auth/user/v5/captcha/get",
    SEND_OTP: "${SSO_BASE_URL}/auth/user/v5/otp/send",
    VALIDATE_OTP: "${SSO_BASE_URL}/auth/user/v5/otp/validate",
    RESEND_OTP: "${SSO_BASE_URL}/auth/user/v5/otp/resend",
    VALIDATE_USER_PAN: "${SSO_BASE_URL}/auth/user/v5/pan/validateuser",
    VALIDATE_PIN: "${SSO_BASE_URL}/auth/user/v5/updatepin",
  },
};

// Add function to resolve URLs
export const getConfig = () => {
  const env = CONFIG[currentEnv];
  return {
    ...env,
    GET_PARTNER_APP_INFO: env.GET_PARTNER_APP_INFO.replace("${API_BASE_URL}", env.API_BASE_URL),
    VALIDATE_USER: env.VALIDATE_USER.replace("${SSO_BASE_URL}", env.SSO_BASE_URL),
    GET_CAPTCHA: env.GET_CAPTCHA.replace("${SSO_BASE_URL}", env.SSO_BASE_URL),
    SEND_OTP: env.SEND_OTP.replace("${SSO_BASE_URL}", env.SSO_BASE_URL),
    VALIDATE_OTP: env.VALIDATE_OTP.replace("${SSO_BASE_URL}", env.SSO_BASE_URL),
    RESEND_OTP: env.RESEND_OTP.replace("${SSO_BASE_URL}", env.SSO_BASE_URL),
    VALIDATE_USER_PAN: env.VALIDATE_USER_PAN.replace("${SSO_BASE_URL}", env.SSO_BASE_URL),
    VALIDATE_PIN: env.VALIDATE_PIN.replace("${SSO_BASE_URL}", env.SSO_BASE_URL),
  };
};
