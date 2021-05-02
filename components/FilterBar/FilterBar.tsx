import { cloneElement, ReactElement } from 'react'
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Container,
  makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    overflowX: 'auto',
  },
  filterWrapper: {
    width: 'max-content',
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing(),
    '& > *:not(:last-child)': {
      marginRight: theme.spacing(),
    },
  },
}))

type ElevationScrollProps = {
  children: ReactElement
}

function ElevationScroll({ children }: ElevationScrollProps) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })
  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

type FilterBarProps = {
  children: ReactElement | ReactElement[]
}

export default function FilterBar({ children }: FilterBarProps) {
  const classes = useStyles()
  return (
    <ElevationScroll>
      <AppBar color="inherit">
        <Toolbar disableGutters>
          <Container maxWidth="sm" className={classes.container}>
            <div data-testid="filterbar" className={classes.filterWrapper}>
              {children}
            </div>
          </Container>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  )
}
