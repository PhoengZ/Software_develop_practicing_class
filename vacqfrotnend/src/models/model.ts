export type Appointment = {
    id: string,
    hospital:hospitalField,
    apptDate:Date,
    user:string
}
export type Hospital = {
    id: string,
    name: string
}
export type hospitalField = {
    name:string,
    province: string,
    tel: string
}