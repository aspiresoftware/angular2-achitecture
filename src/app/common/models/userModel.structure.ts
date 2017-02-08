export class UserModel {
    constructor(
        public id: String,
        public contactNo: string,
        public countryCode: string,
        public createdAt: string,
        public displayPicture: string,
        public email: string,
        public firstname: string,
        public isActivate: string,
        public isDeleted: string,
        public isEulaAccepted: string,
        public lastname: string,
        public password: string,
        public pharmacyNo: string,
        public registrationMethod: string,
        public role_id: string,
        public updatedAt: string
    ) { }
}
