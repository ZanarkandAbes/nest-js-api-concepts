import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common'
import { CreateUserDTO } from './dto/create-user.dto'

@Controller('users')
export class UserController {
  @Post()
  async createUser(@Body() body: CreateUserDTO) {
    return { body }
  }

  @Get()
  async getUsers() {
    return { users: [] }
  }

  @Get(':id')
  async getUser(@Param() params) {
    return { user: {}, params }
  }

  @Put(':id')
  async updateUser(@Body() body, @Param() params) {
    return { method: 'put', body, params }
  }

  @Patch(':id')
  async updatePartialUser(@Body() body, @Param() params) {
    return { method: 'patch', body, params }
  }

  @Delete(':id')
  async deleteUser(@Param() params) {
    return { params }
  }
}
