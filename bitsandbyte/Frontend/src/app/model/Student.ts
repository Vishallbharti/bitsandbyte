import { Address } from "./Address";
import { Course } from "./Course";

export class Student{ 

public id ?: number;
public studentSr ?: string;
public password?:string;
public studentName  ?: string;
public fatherName ?: string;
public motherName ?: string;
public birthDay ?: string;
public gender ?: string;
public mobile?: number;
public guardianMobile?:number;
public blood?:string;
public status ?: string;
public email ?: string;
public studentProfile?:string;
public studentCertificate?: string;
public courseID?: number;
public token ?: string;

public address ?: Address[] = [];
// public course ?: Course[]=[];


    constructor(){

    }
}