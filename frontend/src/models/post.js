export class Post {
    constructor(creator_id, tag_id1, tag_id2, tag_id3, title, post_text) {
        this.creator_id = creator_id;
        this.tag_id1 = tag_id1;
        this.tag_id2 = tag_id2;
        this.tag_id3 = tag_id3;
        this.title = title;
        this.post_text = post_text;
    }
}

export default Post;