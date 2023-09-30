export const getPosts_QUERY = `
    query getPosts($limit: Int!, $cursor: String) {
      posts(limit: $limit, cursor: $cursor) {
        id
        title
        createdAt
        updatedAt
        creatorId
        textSnippet
        creator {
          id
          username
        }
      }
    }`