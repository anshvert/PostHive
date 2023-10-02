export const getPosts_QUERY = `
  query getPosts($limit: Int!, $cursor: String) {
    posts(limit: $limit, cursor: $cursor) {
      id
      title
      createdAt
      updatedAt
      creatorId
      textSnippet
      points
      creator {
        id
        username
      }
    }
  }`
export const getPost_QUERY = `
  query Post($postId: Float!) {
    post(id: $postId) {
      id
      title
      text
      createdAt
    }
  }`