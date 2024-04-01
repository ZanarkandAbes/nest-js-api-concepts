import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common'
import { CreateUserDTO, UpdatePartialUserDTO, UpdateUserDTO } from './dto'
import { UserService } from './user.service'

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
  async getUser(@Param('id', ParseIntPipe) id) {
    return this.userService.show(id)
  }

  @Put(':id')
  async updateUser(@Body() body: UpdateUserDTO, @Param('id', ParseIntPipe) id) {
    return this.userService.update(id, body)
  }

  @Patch(':id')
  async updatePartialUser(@Body() body: UpdatePartialUserDTO, @Param('id', ParseIntPipe) id) {
    return this.userService.updatePartial(id, body)
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id) {
    return this.userService.delete(id)
  }
}
