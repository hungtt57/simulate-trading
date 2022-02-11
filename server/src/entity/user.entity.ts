import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity('wiki_user')
export  class UserEntity {
  @PrimaryColumn()
  id: number;
  @Column({type: 'varchar'})
  email: string;
  @Column({type: 'varchar'})
  fullName: string;
  @Column({type: 'varchar'})
  role: string;
  @Column({ type: 'datetime', nullable: true })
  createdAt: Date;
  @Column({type: 'varchar'})
  npi: string;
}
