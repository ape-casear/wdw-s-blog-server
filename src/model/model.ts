
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
    type: string;
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
    id: number;
    author: string;
    password: string;
    telephone: number;
    create_time: string;
    snake_score: number;
    mine_score: number;
}

export interface BTC{
    id: number;
    name: string;
    price_us: number;
    price_zh: number;
    tran_count: number;
    scrape_date: string;
}

export interface graphics_card{
    id: number;
    name: string;
    url: string;
    price: number;
    scrape_date: string;
    type: string;
}
export interface WebInfo{
    visit_count: number;
    total_comment: number;
}

