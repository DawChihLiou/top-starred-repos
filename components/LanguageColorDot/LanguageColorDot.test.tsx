import { render, screen } from '@testing-library/react'
import LanguageColorDot from './LanguageColorDot'
import { createMuiTheme } from '@material-ui/core'
import { languageColor } from '../../utils/languageColor'

describe('LanguageColorDot', () => {
  it('should have a default color', () => {
    render(<LanguageColorDot />)
    const theme = createMuiTheme()
    expect(screen.getByTestId('color-dot')).toHaveStyle(
      `background-color: ${theme.palette.text.hint}`
    )
  })
  it('should have the color based on language', () => {
    render(<LanguageColorDot language="TypeScript" />)
    expect(screen.getByTestId('color-dot')).toHaveStyle(
      `background-color: ${languageColor['TypeScript']}`
    )
  })
})
