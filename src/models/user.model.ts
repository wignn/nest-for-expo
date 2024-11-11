
export class CreateUserRequest {
    email: string;
    password: string;
    username: string;
    name: string;
}

export class UserResponse {
    id: string;
    email: string;
    name: string;
    username: string;
}


export class LoginUserRequest {
    username: string;
    password: string;
}

export class UserLoginResponse {
    id: string;
    username: string;
    name: string;
    backendTokens: {
        accessToken: string;
        refreshToken: string;
    }
}

export class userFindResponse {
    id: string;
    email: string;
    username: string;
    name: string;
    createdAt: string;
    backgroundPicture?: string;
    profilePicture?: string;
} []


export class UpdateUserRequest {
    bio?: string;
    name?: string;
    profilePicture?: string
    backgroundPicture?: string
    password?: string;
    token?: string;
}