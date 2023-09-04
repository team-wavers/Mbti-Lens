// reference: Kakao Developers
// https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api

type KakaoOAuthType = {
    AuthResponse: {
        code?: string;
        error?: string;
        error_description?: string;
        state?: string;
    };
    TokenResponse: {
        token_type: string;
        access_token: string;
        id_token?: string;
        expires_in: number;
        refresh_token: string;
        refresh_token_expires_in: number;
        scope?: string;
    };
};

export default KakaoOAuthType;
