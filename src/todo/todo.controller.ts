import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post(':id')
  create(@Body() createTodoDto: CreateTodoDto, @Param('id') id: number) {
    return this.todoService.create(createTodoDto, id);
  }

  @Get('/findAllNotCompleted/:id')
  async findAllNotCompleted(@Param('id') id: number) {
    return await this.todoService.findAllNotCompletedTodo(+id);
  }

  @Get('/findAllCompleted/:id')
  async findAllCompleted(@Param('id') id: number) {
    return await this.todoService.findAllCompletedTodo(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.todoService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
