export class TaskOverdueEvents {
  constructor(
    readonly taskId: string,
    readonly userId: string,
  ) {}
}
