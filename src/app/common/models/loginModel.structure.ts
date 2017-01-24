export class LoginModel {
    constructor(
        public email: string, // required
        public password: string, // required, must be 8-12 characters,
        public grantType: string // either 'password' or 'accessToken'
    ){}
}
