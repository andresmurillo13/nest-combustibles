import { User } from "src/auth/entities/user.entity";

export interface UsersResults {
    users: User[];
    totalUsers: number;
}