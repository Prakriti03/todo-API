export interface User{
    id : string;
    name : string;
    email : string;
    password : string;
    permission : string[];
}

export interface GetUserQuery{
    q ?: string;
    page ?:number;
    size ?: number;
    
}



