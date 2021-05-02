import { render, screen } from '@testing-library/react'
import RepoList from './RepoList'

describe('RepoList', () => {
  it('should show loader', () => {
    const props = {
      items: undefined,
      isLoading: true,
      starredRepoNames: {},
      onUpdateStar: jest.fn(),
    }
    render(<RepoList {...props} />)
    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })
  it('should show empty result message', () => {
    const props = {
      items: [],
      isLoading: false,
      starredRepoNames: {},
      onUpdateStar: jest.fn(),
    }
    render(<RepoList {...props} />)
    expect(screen.queryByTestId('loader')).toBeNull()
    expect(screen.getByTestId('no-result-text')).toBeInTheDocument()
    expect(screen.queryByTestId('repo-card')).toBeNull()
  })
  it('should show repo card list', () => {
    const props = {
      items: [
        {
          name: 'tester',
          link: 'https://tester.test',
          description: 'testdesc',
          createdAt: 'Jan 1, 2021',
          numberOfStars: 777,
          ownerName: 'testowner',
          ownerAvatarUrl: 'https://tester.test/avatar',
          ownerLink: 'https://tester.test/owner',
          language: 'testerlang',
        },
        {
          name: 'tester2',
          link: 'https://tester2.test',
          description: 'testdesc2',
          createdAt: 'Jan 1, 2021',
          numberOfStars: 123,
          ownerName: 'testowner2',
          ownerAvatarUrl: 'https://tester2.test/avatar',
          ownerLink: 'https://tester2.test/owner',
          language: 'testerlang2',
        },
      ],
      isLoading: false,
      starredRepoNames: {},
      onUpdateStar: jest.fn(),
    }
    render(<RepoList {...props} />)
    expect(screen.queryByTestId('loader')).toBeNull()
    expect(screen.queryByTestId('no-result-text')).toBeNull()
    expect(screen.queryAllByTestId('repo-card')).toHaveLength(2)
  })
})
