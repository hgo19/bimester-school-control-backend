export class DisciplineAlreadyExistError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'Discipline Already Exist'
  }
}
