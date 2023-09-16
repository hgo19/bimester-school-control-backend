import { GetAllResultsExpress } from '../../src/controllers/get-by-bimester-result-express'
import { BimesterRepositoryStub } from '../mocks/bimester-result-repository-stub'
import { type Request, type Response } from 'express'
import { ListAllResultStub } from '../mocks/list-by-bimester-service-stub'

interface SutTypes {
  service: ListAllResultStub
  sut: GetAllResultsExpress
}

const makeSut = (): SutTypes => {
  const repo = new BimesterRepositoryStub()
  const service = new ListAllResultStub(repo)
  const sut = new GetAllResultsExpress(service)
  return {
    service,
    sut
  }
}

describe('GetAllResultsExpress Controller', () => {
  beforeEach(() => {
    jest.resetAllMocks() // Redefine todos os mocks antes de cada teste
  })

  test('1. should calls next with the error if service throws', async () => {
    // System under test
    const { service, sut } = makeSut()
    jest.spyOn(service, 'execute').mockImplementation(() => { throw new Error() })

    const mReq = {
      body: {}
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

    const mReq = {
      body: {}
    } as unknown as Request

    const mRes = {
      status: jest.fn(() => mRes),
      json: jest.fn()
    } as unknown as Response
    const mNext = jest.fn()

    const expectedResponse = [{
      id: '1',
      bimester: 'PRIMEIRO',
      discipline: 'Geografia',
      grade: 5,
      createdAt: '2023-09-14 10:30:00',
      updatedAt: '2023-09-14 10:30:00'
    }]

    await sut.execute(mReq, mRes, mNext)
    expect(mRes.status).toHaveBeenCalledWith(200)
    expect(mRes.json).toHaveBeenCalledWith(expectedResponse)
  })
})
