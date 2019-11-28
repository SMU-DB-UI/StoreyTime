export class User {
    constructor(firstName, lastName, email, password, user_type, state){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.user_type = user_type;
        this.state = state;
    }
}

export default User;