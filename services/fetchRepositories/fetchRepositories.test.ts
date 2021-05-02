import { fetchRepositories } from './fetchRepositories'
import { response } from './__fixtures__/response'

describe('fetchRepositories', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })
  it('should fetch data with default created date', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(response))
    await fetchRepositories()()
    expect(fetchMock.mock.calls.length).toEqual(1)
    expect(fetchMock.mock.calls[0][0]).toEqual(
      'https://api.github.com/search/repositories?q=created%3A%3E2017-01-01&sort=stars&order=desc&per_page=30&page=1'
    )
  })
  it('should fetch data with given created date', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(response))
    const created = '2021-04-23'
    await fetchRepositories(created)()
    expect(fetchMock.mock.calls.length).toEqual(1)
    expect(fetchMock.mock.calls[0][0]).toEqual(
      `https://api.github.com/search/repositories?q=created%3A%3E${created}&sort=stars&order=desc&per_page=30&page=1`
    )
  })
})
