import { type BimesterResultInput, type BimesterResultOutput } from './'

export interface BimesterResultRepository {
  create: (input: BimesterResultInput) => Promise<BimesterResultOutput>
  findOne: (id: string) => Promise<BimesterResultOutput>
  isThereAlready: (bimester: string, discipline: string) => Promise<boolean>
}
