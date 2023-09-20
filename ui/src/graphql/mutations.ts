export const REGISTER_MUT = `
    mutation Register($username: String!, $password: String!, $email: String! ) {
      register(options: {username: $username, password: $password, email: $email}) {
        user {
          id
        }
      }
    }`
export const LOGIN_MUT = `
    mutation Login($username: String!, $password: String!, $email: String!) {
      login(options: {username: $username, password: $password, email: $email}) {
        user {
          username
          id
          createdAt
          updatedAt
        }
        errors {
          field
          message
        }
      }
    }`
export const FORGOTPASSWORD_MUT = `
    mutation ForgotPassword($email: String!) {
      forgotPassword(email: $email) {
        user {
          id
        }
      }
    }`
export const CHANGEPASSWORD_MUT = `
    mutation ChangePassword($token: String!, $newPassword: String!, $email: String!) {
      changePassword(token: $token, newPassword: $newPassword, email: $email){
        user {
          id
        }
        errors {
          field
          message
        }
      }
    }`