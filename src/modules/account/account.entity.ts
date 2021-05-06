import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { Expose } from 'class-transformer';

@Table
export class Account extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  login: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  githubId: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  avatarUrl: string;

  /**
   * 0: un auth
   * 1: is auth
   */
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  isAuth: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  accessToken: number;
}

export class SafeAccount {
  id: number;
  uuid: string;
  name: string;
  avatarUrl: string;

  constructor(account: Account) {
    this.id = account.id;
    this.uuid = account.uuid;
    this.name = account.name;
    this.avatarUrl = account.avatarUrl;
  }
}
