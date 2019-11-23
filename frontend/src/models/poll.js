export class Poll {
    constructor(creator_id, question, answer1, answer2, count_answer1, count_answer2) {
        this.creator_id = creator_id;
        this.question = question;
        this.answer1 = answer1;
        this.answer2 = answer2;
        this.count_answer1 = count_answer1;
        this.count_answer2 = count_answer2;
    }
}

export default Poll;