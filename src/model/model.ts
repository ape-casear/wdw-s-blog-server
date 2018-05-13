
export interface Blog{
    id: number;
    bloglistid: number;
    blog: string;
}
//{id:2,title:'blog3',author:'wdw',pub_date:'2018-05-04',like:21,browse_count:2000}];
export interface BlogList{
    id: number;
    title: string;
    author: string;
    pub_date: string;
    like: number;
    browse_count: number;
    tag: string;
}
//{id:1, user: '独孤求败', comment: '丢你老谋', comment_datatime: '2018-05-09 12:32:11', floor: 1, sub_comment: 
export interface Comment{
    id: number;
    bloglistid: number;
    author: string;
    comment: string;
    comment_datatime: string;
    parent: number;
}
export interface User{
    uid: number;
    author: string;
    telephone: number;
    describe: string;
    head_img: string;
    snake_score: number;
    mine_score: number;
}

export interface WebInfo{
    visit_count: number;
    total_comment: number;
}

