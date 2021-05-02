import { useState, useMemo } from 'react'
import {
  Button,
  Menu,
  MenuItem,
  makeStyles,
  ClickAwayListener,
} from '@material-ui/core'
import { isNil } from 'lodash'
import { FilterKey, FilterValue } from '@typings/filter'

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: theme.spacing(4),
    boxShadow: 'none',
  },
}))

type FilterProps = {
  name: FilterKey
  label?: string
  items?: string[]
  disabled?: boolean
  onUpdate?: (key: string, value: string | null) => void
  selected?: FilterValue
}

/**
 * `Filter` contains a button, a label, and a list of options for users to select.
 * Filtering should have effect on the repository list.
 */
export default function Filter({
  name,
  label = '',
  items = [],
  disabled,
  selected,
  onUpdate,
}: FilterProps) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (value?: string) => () => {
    if (value !== undefined) {
      if (onUpdate !== undefined) {
        onUpdate(name, value)
      }
    }
    setAnchorEl(null)
  }

  const display = useMemo(() => {
    if (isNil(selected)) {
      return label
    }
    return `${label} · ${selected}`
  }, [selected, label])

  return (
    <ClickAwayListener onClickAway={handleClose()}>
      <>
        <Button
          data-testid="filter-button"
          aria-controls={name}
          aria-haspopup="true"
          onClick={handleClick}
          color="primary"
          variant="contained"
          className={classes.button}
          disabled={disabled}
        >
          {display}
        </Button>
        <Menu
          id={`${name}-filter-menu`}
          data-testid="filter-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose()}
        >
          {items &&
            items.map((item) => (
              <MenuItem
                key={item}
                data-testid="filter-menuitem"
                onClick={handleClose(item)}
                selected={selected === item}
              >
                {item}
              </MenuItem>
            ))}
        </Menu>
      </>
    </ClickAwayListener>
  )
}
