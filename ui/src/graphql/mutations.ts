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