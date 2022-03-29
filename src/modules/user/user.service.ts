import prisma from "../../configs/db";
import { User } from "@prisma/client";
import PTypes, { BatchPayload } from "../../configs/db/types"
import { giveToken } from "cqx-secure";

class UserService {

    constructor() { }

    // Methods for creating User

    async addOne(data: PTypes.UserCreateInput): Promise<User> {
        return prisma.user.create({ data });
    }

    // Methods for get User information

    async getAll(args: PTypes.UserFindManyArgs): Promise<Array<User>> {
        return prisma.user.findMany(args);
    }

    // async countRecord(id: number): Promise<number> {
    //     return prisma.record.count({select : {}})
    // }

    async getById(id: number): Promise<User | null> {
        return prisma.user.findUnique({ where: { id_: id } });
    }

    // Methods for updating User information

    async updateById(id: number, args: PTypes.UserUpdateInput): Promise<User> {
        return prisma.user.update({ where: { id_: id }, data: args });
    }


    // Methods for deleting User

    async deleteAll(): Promise<BatchPayload> {
        return prisma.user.deleteMany({});
    }

    async deleteById(id: number): Promise<User> {
        return prisma.user.delete({ where: { id_: id } });
    }

}

export default UserService;