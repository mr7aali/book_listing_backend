


export type Itoken = {
    role: string,
    userId: string
}

export type ILoginResponse = {
    accessToken: string,
    refreshToken?: string
}

export type IRefreshTokenResponse = {
    accessToken: string
}