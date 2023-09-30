export interface Post {
    id: number,
    title: string,
    createdAt: Date,
    updatedAt: Date,
    text: string,
    textSnippet: string
    creator: {
        id: number,
        username: string
    }
}