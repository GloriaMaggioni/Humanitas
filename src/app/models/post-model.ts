import { CommentModel } from "./comment-model";

export interface PostModel {
    id?: number | undefined,    //creato dal backend
    user_id: number,
    title: string,
    body: string,
    comment: CommentModel[]
}
