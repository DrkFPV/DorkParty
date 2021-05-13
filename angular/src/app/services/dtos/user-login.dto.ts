export interface UserLoginRequestDto {
    username: string;
    password: string;
}

export interface UserLoginResponseDto {
    accessToken: string;
    expiresAt: string;
}
