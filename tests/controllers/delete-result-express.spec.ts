import { DeleteResultExpress } from '../../src/controllers/delete-result-express'
import { BimesterRepositoryStub } from '../mocks/bimester-result-repository-stub'
import { type Request, type Response } from 'express'
import { RemoveResultStub } from '../mocks/remove-result-service-stub'

interface SutTypes {
  service: RemoveResultStub
  sut: DeleteResultExpress
}

const makeSut = (): SutTypes => {
  const repo = new BimesterRepositoryStub()
  const service = new RemoveResultStub(repo)
  const sut = new DeleteResultExpress(service)
  return {
    service,
    sut
  }
}

describe('DeleteResultExpress Controller', () => {
  beforeEach(() => {
    jest.resetAllMocks() // Redefine todos os mocks antes de cada teste
  })

  test('1. ensure service is called with the right values', async () => {
    // System under test
    const { service, sut } = makeSut()
    const serviceSpy = jest.spyOn(service, 'execute')

    const mReq = {
      params: {
        id: '1'
      }
    } as unknown as Request

    const mRes = {
      status: jest.fn(() => mRes),
      json: jest.fn()
    } as unknown as Response
    const mNext = jest.fn()

    await sut.execute(mReq, mRes, mNext)

    expect(serviceSpy).toHaveBeenCalledWith('1')
  })

  test('2. should calls next with the error if service throws', async () => {
    // System under test
    const { service, sut } = makeSut()
    jest.spyOn(service, 'execute').mockImplementation(() => { throw new Error() })

    const mReq = {
      params: {}
    } as unknown as Request
    const mRes = {
      status: jest.fn(() => mRes),
      json: jest.fn()
    } as unknown as Response
    const mNext = jest.fn()

    await sut.execute(mReq, mRes, mNext)
    expect(mNext).toBeCalledWith(new Error())
  })

  test('3. should call controller response with the right values', async () => {
    // System under test
    const { sut } = makeSut()

    const mReq = {
      params: {
        id: '1'
      }
    } as unknown as Request

    const mRes = {
      status: jest.fn(() => mRes),
      json: jest.fn()
    } as unknown as Response
    const mNext = jest.fn()

    await sut.execute(mReq, mRes, mNext)
    expect(mRes.status).toHaveBeenCalledWith(204)
    expect(mRes.json).toHaveBeenCalledWith({ message: 'result deleted.' })
  })
})
