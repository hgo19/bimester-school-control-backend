import { AddResultExpress } from '../../src/controllers/add-result-express'
import { BimesterResult } from '../../src/entity/bimester-result'
import { BimesterRepositoryStub } from '../mocks/bimester-result-repository-stub'
import { type Request, type Response } from 'express'
import { CreateResultStub } from '../mocks/create-result-service-stub'
import { type CreateResult } from '../../src/services/create-result'

interface SutTypes {
  service: CreateResult
  sut: AddResultExpress
}

const makeSut = (): SutTypes => {
  const entity = new BimesterResult()
  const repo = new BimesterRepositoryStub()
  const service = new CreateResultStub(entity, repo)
  const sut = new AddResultExpress(service)
  return {
    service,
    sut
  }
}

describe('AddResultExpress Controller', () => {
  beforeEach(() => {
    jest.resetAllMocks() // Redefine todos os mocks antes de cada teste
  })

  test('1. should calls next with the error if service throws', async () => {
    // System under test
    const { service, sut } = makeSut()
    jest.spyOn(service, 'execute').mockImplementation(() => { throw new Error() })

    const bodyReq = {
      bimester: 'invalid_bimester',
      discipline: 'invalid_discipline',
      grade: 0
    }

    const mReq = {
      body: bodyReq
    } as unknown as Request
    const mRes = {
      status: jest.fn(() => mRes),
      json: jest.fn()
    } as unknown as Response
    const mNext = jest.fn()

    await sut.execute(mReq, mRes, mNext)
    expect(mNext).toBeCalledWith(new Error())
  })

  test('2. should call controller response with the right values', async () => {
    // System under test
    const { sut } = makeSut()

    const bodyReq = {
      bimester: 'PRIMEIRO',
      discipline: 'Geografia',
      grade: 10
    }

    const mReq = {
      body: bodyReq
    } as unknown as Request
    const mRes = {
      status: jest.fn(() => mRes),
      json: jest.fn()
    } as unknown as Response
    const mNext = jest.fn()

    const expectedResponse = {
      id: '1',
      bimestre: 'PRIMEIRO',
      disciplina: 'Geografia',
      nota: 5,
      criadoEm: '2023-09-14 10:30:00'
    }

    await sut.execute(mReq, mRes, mNext)
    expect(mRes.status).toHaveBeenCalledWith(201)
    expect(mRes.json).toHaveBeenCalledWith(expectedResponse)
  })
})
