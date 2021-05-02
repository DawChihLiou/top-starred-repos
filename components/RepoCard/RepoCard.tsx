import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  CardActions,
  Link,
  Button,
  makeStyles,
} from '@material-ui/core'
import StarOutlineOutlinedIcon from '@material-ui/icons/StarOutlineOutlined'
import StarIcon from '@material-ui/icons/Star'
import { GoMarkGithub } from 'react-icons/go'
import LanguageColorDot from '@components/LanguageColorDot'

const useStyles = makeStyles((theme) => ({
  icon: {
    width: '0.8em',
    height: '0.8em',
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  wrapper: {
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing(),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  label: {
    marginRight: theme.spacing(),
  },
}))

type RepoCardType = {
  name: string
  link: string
  description: string
  createdAt: string
  numberOfStars: number
  ownerName: string
  ownerAvatarUrl: string
  ownerLink: string
  language: string
  starred?: boolean
  onUpdateStar?: () => void
}

/**
 * `RepoCard` contains information about a gitHub repository and its owner.
 */
export default function RepoCard({
  name,
  link,
  description,
  createdAt,
  numberOfStars,
  ownerName,
  ownerAvatarUrl,
  ownerLink,
  language,
  starred,
  onUpdateStar,
}: RepoCardType) {
  const classes = useStyles()

  return (
    <Card data-testid="repo-card" elevation={0} variant="outlined">
      <CardHeader
        className={classes.wrapper}
        avatar={
          <Avatar
            aria-label="ower"
            data-testid="avatar"
            src={ownerAvatarUrl}
            className={classes.avatar}
          />
        }
        title={
          <Link
            target="_blank"
            rel="noopener"
            href={ownerLink}
            color="textPrimary"
          >
            {ownerName}
          </Link>
        }
        subheader={`Created on ${createdAt}`}
      />
      <CardContent className={classes.wrapper}>
        <Typography variant="h6">
          <Link target="_blank" rel="noopener" href={link} color="textPrimary">
            {name}
          </Link>
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions className={classes.wrapper}>
        <Typography variant="button" className={classes.label}>
          <LanguageColorDot language={language} />
          {language}
        </Typography>
        <Button
          data-testid="star-button"
          startIcon={
            starred ? <StarIcon color="primary" /> : <StarOutlineOutlinedIcon />
          }
          onClick={onUpdateStar}
        >
          {numberOfStars}
        </Button>
        <Button
          startIcon={<GoMarkGithub className={classes.icon} />}
          target="_blank"
          rel="noopener"
          component={Link}
          href={link}
        >
          Go to Repo
        </Button>
      </CardActions>
    </Card>
  )
}
