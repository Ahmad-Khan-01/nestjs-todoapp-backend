import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

// todo.service.ts
@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepo: Repository<Todo>,
    private readonly userService: UserService,
  ) {}

  async create(createTodoDto: CreateTodoDto, userId: number) {
    // 1. Pull the properties you need from the DTO
    const { title } = createTodoDto; // ✅ instance property
    const date = new Date().toLocaleString(); // store the real Date (or .toLocaleString() if you want a string)

    const user = await this.userService.findOne(userId);

    const todo = this.todoRepo.create({
      title,
      date,
      completed: false,
      user,
    });

    return await this.todoRepo.save(todo);
  }

  async findAllNotCompletedTodo(userId: number) {
    return await this.todoRepo.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: false },
    });
  }
  async findAllCompletedTodo(userId: number) {
    return await this.todoRepo.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: true },
    });
  }
  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number) {
    return this.todoRepo.update(id, { completed: true });
  }

  async remove(id: number) {
    return await this.todoRepo.delete(id);
  }
}
