import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity( "addresses")
export class Address {
    @PrimaryGeneratedColumn()
    aid! : string
    @Column("varchar")
    country! : string
    @Column("varchar")
    city! : string
    @Column("varchar")
    details! : string

}