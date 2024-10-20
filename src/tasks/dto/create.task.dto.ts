import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  header: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  due_date: Date;
  overdue: boolean;
  status: string;
  @IsOptional()
  executorId: string;
}
