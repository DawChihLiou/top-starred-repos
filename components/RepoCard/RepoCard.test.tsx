import { render, screen, fireEvent } from '@testing-library/react'
import RepoCard from './RepoCard'

describe('RepoCard', () => {
  it('should render all the visual elements', () => {
    const props = {
      name: 'tester',
      link: 'https://tester.test',
      description: 'testdesc',
      createdAt: 'Jan 1, 2021',
      numberOfStars: 777,
      ownerName: 'testowner',
      ownerAvatarUrl: 'https://tester.test/avatar',
      ownerLink: 'https://tester.test/owner',
      language: 'testerlang',
      starred: false,
      onUpdateStar: jest.fn(),
    }
    render(<RepoCard {...props} />)
    expect(screen.getByText(props.name)).toHaveAttribute('href')
    expect(screen.getByText('Go to Repo').parentElement).toHaveAttribute(
      'href',
      props.link
    )
    expect(screen.getByTestId('avatar').firstChild).toHaveAttribute(
      'src',
      props.ownerAvatarUrl
    )
    expect(screen.getByText(props.ownerName)).toHaveAttribute(
      'href',
      props.ownerLink
    )
    expect(screen.getByText(props.description)).toBeInTheDocument()
    expect(
      screen.getByText(`Created on ${props.createdAt}`)
    ).toBeInTheDocument()
    expect(screen.getByText(props.numberOfStars)).toBeInTheDocument()
    expect(screen.getByText(props.language)).toBeInTheDocument()
    expect(screen.getByTestId('color-dot')).toBeInTheDocument()
  })
  it('should fire "onUpdateStar" event handler by clicking on star button', () => {
    const props = {
      name: 'tester',
      link: 'https://tester.test',
      description: 'testdesc',
      createdAt: 'Jan 1, 2021',
      numberOfStars: 777,
      ownerName: 'testowner',
      ownerAvatarUrl: 'https://tester.test/avatar',
      ownerLink: 'https://tester.test/owner',
      language: 'testerlang',
      starred: false,
      onUpdateStar: jest.fn(),
    }
    render(<RepoCard {...props} />)

    fireEvent.click(screen.getByTestId('star-button'))
    expect(props.onUpdateStar).toBeCalledTimes(1)
  })
})
