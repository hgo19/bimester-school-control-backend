import { type BiemonthlyResultInput } from './biemonthly-result-input'
import { type BiemonthlyResultOutput } from './biemonthly-result-output'

export interface BiemonthlyResultRepository {
  create: (input: BiemonthlyResultInput) => Promise<BiemonthlyResultOutput>
}
