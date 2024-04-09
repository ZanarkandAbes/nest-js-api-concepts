import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDTO, UpdatePartialUserDTO, UpdateUserDTO } from './dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ email, name, password }: CreateUserDTO) {
    return this.prisma.users.create({
      data: {
        email,
        name,
        password,
      },
    })
  }

  async list() {
    return this.prisma.users.findMany()
  }

  async show(id: number) {
    await this.userExists(id)
    return this.prisma.users.findUnique({ where: { id } })
  }

  async update(id: number, { email, name, password, birthAt }: UpdateUserDTO) {
    await this.userExists(id)

    return this.prisma.users.update({
      data: { email, name, password, birthAt: birthAt ? new Date(birthAt) : null },
      where: {
        id,
      },
    })
  }

  async updatePartial(id: number, { email, name, password, birthAt }: UpdatePartialUserDTO) {
    await this.userExists(id)

    const data: { email?: string; name?: string; password?: string; birthAt?: Date } = {}

    if (birthAt) data.birthAt = new Date(birthAt)
    if (email) data.email = email
    if (name) data.name = name
    if (password) data.password = password

    return this.prisma.users.update({
      data,
      where: {
        id,
      },
    })
  }

  async delete(id: number) {
    await this.userExists(id)

    return this.prisma.users.delete({ where: { id } })
  }

  async userExists(id: number) {
    if (!(await this.prisma.users.count({ where: { id } })))
      throw new NotFoundException(`O usuário ${id} não existe`)
  }
}
