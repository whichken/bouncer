import { Entity, Column, OneToOne, JoinColumn } from 'typeorm'
import { Base } from './base'
import { User } from './user'

@Entity()
export class Password extends Base {
  @OneToOne(_type => User)
  @JoinColumn()
  user!: User

  @Column()
  hash!: string

  @Column()
  rounds!: number
}
