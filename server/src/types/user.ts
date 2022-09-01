import { UserEntity } from 'src/entities/user.entity';

export type IUser = Omit<UserEntity, 'hashPassword'>;
