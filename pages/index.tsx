import { useSearchMinDate } from '@hooks/useSearchMinDate'
import { useQuery } from 'react-query'
import { fetchRepositories } from '@services/fetchRepositories'
import {
  Container,
  Typography,
  Box,
  useMediaQuery,
  Theme,
} from '@material-ui/core'
import RepoList from '@components/RepoList'
import { useMemo } from 'react'
import FilterBar from '@components/FilterBar'
import Filter from '@components/Filter'
import { flow, uniq } from 'lodash'
import { map, concat } from 'lodash/fp'
import { GitHubRepositoryResponseItemType } from '@typings/githubRepositoryResponseType'
import { useFilterState } from '@hooks/useFilterState'
import { useStar } from '@hooks/useStar'
import { DateTime } from 'luxon'

export default function Home() {
  const today = useSearchMinDate()
  const isSmallViewPortUp = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('sm')
  )
  const { isLoading, isError, data } = useQuery(
    'respositories',
    fetchRepositories(today)
  )
  const { filterState, updateFilterState } = useFilterState()
  const { starredRepoNames, starRepo } = useStar()

  const repos = useMemo(() => {
    return data?.items
      .map((item) => ({
        name: item.full_name,
        link: item.html_url,
        description: item.description,
        numberOfStars: item.stargazers_count,
        ownerName: item.owner.login,
        ownerAvatarUrl: item.owner.avatar_url,
        ownerLink: item.owner.html_url,
        language: item.language,
        createdAt: DateTime.fromISO(item.created_at).toFormat('LLL dd, yyyy'),
      }))
      .filter((item) => {
        if (filterState.language === 'All') {
          return true
        }
        return filterState.language === item.language
      })
      .filter((item) => {
        if (filterState.show === 'All') {
          return true
        }
        return starredRepoNames[item.name] === 1
      })
  }, [data, filterState, starredRepoNames])

  const languages = useMemo(() => {
    const pickLanguages = flow(
      map((item: GitHubRepositoryResponseItemType) => item.language),
      concat('All'),
      uniq
    )
    return pickLanguages(data?.items)
  }, [data])

  return (
    <Container maxWidth="sm">
      <FilterBar>
        <Filter
          items={['All', 'Starred']}
          name="show"
          label="Show"
          disabled={isLoading}
          onUpdate={updateFilterState}
          selected={filterState.show}
        />
        <Filter
          items={languages}
          name="language"
          label="Language"
          disabled={isLoading}
          onUpdate={updateFilterState}
          selected={filterState.language}
        />
      </FilterBar>
      <Box mt={isSmallViewPortUp ? 8 : 7} mb={1}>
        {isError && (
          <Typography>
            Service is currently unavailable. Please refresh the page or try
            again later.
          </Typography>
        )}
        {!isError && (
          <RepoList
            isLoading={isLoading}
            items={repos}
            starredRepoNames={starredRepoNames}
            onUpdateStar={starRepo}
          />
        )}
      </Box>
    </Container>
  )
}
