import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Message extends Model {
  @Column
  id: number;
  @Column
  uuid: string;
  @Column
  message: Text;
  @Column
  code: string;
}
