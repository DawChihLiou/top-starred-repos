import { GitHubRepositoryResponseType } from '@typings/githubRepositoryResponseType'

export const fetchRepositories = (
  created: string = '2017-01-01'
) => async () => {
  const endpoint = 'https://api.github.com/search/repositories'
  const q = `q=${encodeURIComponent(`created:>${created}`)}`
  const response = await fetch(
    `${endpoint}?${q}&sort=stars&order=desc&per_page=30&page=1`
  )
  const json = await response.json()

  return json as Promise<GitHubRepositoryResponseType>
}
