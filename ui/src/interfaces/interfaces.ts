export interface Post {
    id: number,
    title: string,
    createdAt: Date,
    updatedAt: Date,
    text: string,
    textSnippet: string,
    points: number,
    creator: {
        id: number,
        username: string
    }
}