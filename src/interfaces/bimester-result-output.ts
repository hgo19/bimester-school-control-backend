import { type BimesterResultInput } from './bimester-result-input'

export interface BimesterResultOutput extends BimesterResultInput {
  id: string
  createdAt: string
  updatedAt?: string
}
