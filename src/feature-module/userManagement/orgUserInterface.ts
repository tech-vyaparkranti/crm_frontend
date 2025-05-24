export interface userInsert {
    name :string;
    email:string;
    department: string ;
    designation : string ;
    emp_id : string ;
    password : string ;
    phone : number ;
    status : string ;
    org_id : number; 
    image : File | null; 
    role : string;
    action:string;
}

export interface orgUserData {
    id: number,
    name :string;
    email:string;
    department: string ;
    designation : string ;
    emp_id : string ;
    password : string ;
    phone : number ;
    status : string ;
    org_id : number; 
    profile_img : File | null; 
    role : string;
    action: string;
    key: number;
    created_at : Date;
}