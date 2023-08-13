type KakaoUser = {
  email: string;
  nickname: string;
  phone_number: string;
};

export type KakaoRequest = Request & { user: KakaoUser };
