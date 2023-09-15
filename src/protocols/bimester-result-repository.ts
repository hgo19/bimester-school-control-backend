import { type BimesterResultInput, type BimesterResultOutput } from './'

export interface BimesterResultRepository {
  create: (input: BimesterResultInput) => Promise<BimesterResultOutput>
  findOne: (id: number) => Promise<BimesterResultOutput>
  isThereAlready: (bimester: string, discipline: string) => Promise<boolean>
  getAll: () => Promise<BimesterResultOutput[]>
  delete: (id: string) => Promise<boolean>
}
