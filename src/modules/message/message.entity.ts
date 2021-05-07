import { Table, Column, Model, DataType, Comment } from 'sequelize-typescript';

@Table
export class Message extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(36),
    allowNull: false,
  })
  uuid: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  message: string;

  @Column({
    type: DataType.STRING(6),
    allowNull: false,
  })
  code: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  @Comment('information/success/alert/error')
  type: string;
}
