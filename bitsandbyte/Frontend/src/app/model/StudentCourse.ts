export class StudentCourse {
    public studentId: number;
    public cId: number[];
    constructor( studentId:number, cId:number[] ) {
        this.cId = cId;
        this.studentId = studentId;
     }
}
