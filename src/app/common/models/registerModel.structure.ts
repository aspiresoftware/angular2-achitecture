/**
 * Register Model
 */
export class RegisterModel {
    constructor(
        public email: string, // required
        public password: string, // required, must be 8-12 characters
        public confirmPassword: string // required, must be 8-12 characters, must equal to password
    ) { }
}
