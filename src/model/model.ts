
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
}

export interface User{
    uid: number;
    name: string;
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

