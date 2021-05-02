import { makeStyles, Theme } from '@material-ui/core'
import { languageColor } from '@utils/languageColor'

const UNMATCHED_LANGUAGE = 'UNMATCHED_LANGUAGE'

const useStyles = makeStyles<Theme, LanguageColorDotProps>((theme) => ({
  root: {
    backgroundColor: (props) =>
      languageColor[props.language ?? UNMATCHED_LANGUAGE] ??
      theme.palette.text.hint,
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: theme.spacing(),
    verticalAlign: 'middle',
  },
}))

type LanguageColorDotProps = {
  language?: string | undefined
}

/**
 * `LanguageColorDot` creates a circle with a matching GitHub Language color.
 */
export default function LanguageColorDot(props: LanguageColorDotProps) {
  const classes = useStyles(props)
  return <span data-testid="color-dot" className={classes.root}></span>
}
