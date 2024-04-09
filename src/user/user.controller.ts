import { Body, Controller, Delete, Get, Patch, Post, Put, UseInterceptors } from '@nestjs/common'
import { CreateUserDTO, UpdatePartialUserDTO, UpdateUserDTO } from './dto'
import { UserService } from './user.service'
import { LogInterceptor } from 'src/interceptors/log.interceptor'
import { ParamId } from 'src/decorators/param-id.decorator'

@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: CreateUserDTO) {
    return this.userService.create(body)
  }

  @Get()
  async getUsers() {
    return this.userService.list()
  }

  @Get(':id')
  async getUser(@ParamId() id: number) {
    console.log({ id })
    return this.userService.show(id)
  }

  @Put(':id')
  async updateUser(@Body() body: UpdateUserDTO, @ParamId() id: number) {
    return this.userService.update(id, body)
  }

  @Patch(':id')
  async updatePartialUser(@Body() body: UpdatePartialUserDTO, @ParamId() id: number) {
    return this.userService.updatePartial(id, body)
  }

  @Delete(':id')
  async deleteUser(@ParamId() id: number) {
    return this.userService.delete(id)
  }
}
