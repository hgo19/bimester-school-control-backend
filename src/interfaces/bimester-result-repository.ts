import { type BimesterResultInput, type BimesterResultOutput } from './'

export interface BimesterResultRepository {
  create: (input: BimesterResultInput) => Promise<BimesterResultOutput>
  findOne: (id: number) => Promise<BimesterResultOutput | null>
  hasBimesterRegistered: (bimester: string, discipline: string) => Promise<boolean>
  getAllResults: () => Promise<BimesterResultOutput[] >
  delete: (id: string) => Promise<void>
}
