// import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity("employees") // {name: 'employees'}
export class Employee {
    @PrimaryGeneratedColumn()
    eid! : string
    @Column("varchar") // ColumnTypeUndefinedError: Column type for Employee#firstname is not defined and cannot be guessed. have to specify type
    firstname! : string
    @Column("varchar")
    lastname! : string
    @Column("varchar")
    position! : string
    @Column("boolean")
    active! : boolean
    @Column("double")
    salary! : number
}