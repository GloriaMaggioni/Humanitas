import { CommentModel } from "./comment-model";

export interface PostModel {
    name: string,
    data: string,
    description: string,
    comment: CommentModel[]
}
