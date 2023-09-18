import { type BimesterResultOutput } from '../interfaces'
import { type BimesterResultInDb } from '../interfaces/bimester-result-in-db'

export class BimesterResultMapper {
  public toDomain (entity: BimesterResultInDb): BimesterResultOutput | null {
    if (entity === undefined) {
      return null
    }

    return {
      id: entity.id.toString(),
      bimester: entity.bimestre,
      discipline: entity.disciplina,
      grade: entity.nota,
      createdAt: entity.criadoEm,
      updatedAt: entity.atualizadoEm
    }
  }

  public toPersist (domain: BimesterResultOutput): BimesterResultInDb {
    return {
      id: Number(domain.id),
      bimestre: domain.bimester,
      disciplina: domain.discipline,
      nota: domain.grade,
      criadoEm: domain.createdAt,
      atualizadoEm: domain.updatedAt
    }
  }
}
