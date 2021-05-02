import RepoCard from '@components/RepoCard'
import { makeStyles, CircularProgress, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  repoList: {
    '& > *': {
      width: '100%',
      marginBottom: theme.spacing(),
    },
    minHeight: '50vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
}))

type ItemType = {
  name: string
  link: string
  description: string
  numberOfStars: number
  ownerName: string
  ownerAvatarUrl: string
  ownerLink: string
  language: string
  createdAt: string
}
type RepoListProps = {
  items: ItemType[] | undefined
  isLoading: boolean
  starredRepoNames: Record<string, number>
  onUpdateStar: (name: string) => () => void
}

/**
 * RepoList contains a list of `RepoCard`s as items. It also reflects loading
 * state and empty state.
 */
export default function RepoList({
  items,
  isLoading,
  starredRepoNames,
  onUpdateStar,
}: RepoListProps) {
  const classes = useStyles()

  return (
    <div className={classes.repoList}>
      {isLoading && <CircularProgress data-testid="loader" />}
      {!isLoading && !items?.length && (
        <Typography data-testid="no-result-text">
          Ops, no result. Please adjust filters to see top repositories.
        </Typography>
      )}
      {!isLoading &&
        items?.map((item) => (
          <RepoCard
            key={item.link}
            name={item.name}
            description={item.description}
            createdAt={item.createdAt}
            link={item.link}
            numberOfStars={
              item.numberOfStars + (starredRepoNames[item.name] ?? 0)
            }
            ownerName={item.ownerName}
            ownerLink={item.ownerLink}
            ownerAvatarUrl={item.ownerAvatarUrl}
            language={item.language}
            starred={starredRepoNames[item.name] === 1}
            onUpdateStar={onUpdateStar(item.name)}
          />
        ))}
    </div>
  )
}
