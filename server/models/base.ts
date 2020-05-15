import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm'

export class Base {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @CreateDateColumn()
  created!: Date

  @UpdateDateColumn()
  updated!: Date
}
