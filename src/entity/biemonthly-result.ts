import { InvalidParams } from '../expections/invalid-param'
import { type BiemonthlyResultInput } from '../protocols/biemonthly-result-input'

export class BiemonthlyResult {
  private _bimester: string
  private _discipline: string
  private _grade: number

  constructor () {
    this._bimester = ''
    this._discipline = ''
    this._grade = 0
  }

  public create (bimesterInfo: BiemonthlyResultInput): void {
    this.validations(bimesterInfo)
    this._bimester = bimesterInfo.bimester
    this._discipline = bimesterInfo.discipline
    this._grade = bimesterInfo.grade
  }

  public validations (bimesterInfo: BiemonthlyResultInput): void {
    const bimesters = ['PRIMEIRO', 'SEGUNDO', 'TERCEIRO', 'QUARTO']
    const disciplines = ['Biologia', 'Artes', 'Geografia', 'Sociologia']
    const MIN_GRADE = 0
    const MAX_GRADE = 10

    if (!bimesters.some((bimester) => bimester === bimesterInfo.bimester)) {
      throw new InvalidParams("Bimester must be one of following: 'PRIMEIRO', 'SEGUNDO', 'TERCEIRO', 'QUARTO'")
    }

    if (!disciplines.some((discipline) => discipline === bimesterInfo.discipline)) {
      throw new InvalidParams("Discipline must be one of following: 'Biologia', 'Artes', 'Geografia', 'Sociologia'")
    }

    if (bimesterInfo.grade < MIN_GRADE || bimesterInfo.grade > MAX_GRADE) {
      throw new InvalidParams('Grade value must be between 0 and 10')
    }
  }
}
