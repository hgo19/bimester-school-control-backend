import { type BiemonthlyResultInput } from './biemonthly-result-input'

export interface BiemonthlyResultOutput extends BiemonthlyResultInput {
  id: string
  createdAt: string
  updatedAt?: string
}
