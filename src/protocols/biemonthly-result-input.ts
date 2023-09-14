type bimesterType = 'PRIMEIRO' | 'SEGUNDO' | 'TERCEIRO' | 'QUARTO'
type disciplineType = 'Biologia' | 'Artes' | 'Geografia' | 'Sociologia'

export interface BiemonthlyResultInput {
  bimester: bimesterType
  discipline: disciplineType
  grade: number
}
