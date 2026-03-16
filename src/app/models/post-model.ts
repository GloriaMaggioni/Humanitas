import { CommentModel } from "./comment-model";

export interface PostModel {
    id?: string,    //creato dal backend
    name: string,
    image?: string,
    data: string,
    description: string,
    comment: CommentModel[]
}
