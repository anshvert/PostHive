export const REGISTER_MUT = `
    mutation Register($username: String!, $password: String!) {
      register(options: {username: $username, password: $password }) {
        user {
          id
        }
      }
    }`
export const LOGIN_MUT = `
    mutation Login($username: String!, $password: String!) {
      login(options: {username: $username, password: $password }) {
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