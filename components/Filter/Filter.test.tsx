import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react'
import Filter from './Filter'

describe('Filter', () => {
  beforeEach(cleanup)

  it('should disable filter button', () => {
    const props = {
      name: 'tester' as any,
      label: 'tester',
      items: ['item-1', 'item-2'],
      disabled: true,
      onUpdate: jest.fn(),
      selected: 'item-1',
    }
    render(<Filter {...props} />)
    expect(screen.getByTestId('filter-button')).toHaveAttribute('disabled')
  })
  it('should render all the visual elements', async () => {
    const props = {
      name: 'tester' as any,
      label: 'tester',
      items: ['item-1', 'item-2'],
      disabled: false,
      onUpdate: jest.fn(),
      selected: 'item-1',
    }
    render(<Filter {...props} />)
    expect(screen.getByTestId('filter-button')).toHaveTextContent(
      'tester · item-1'
    )

    fireEvent.click(screen.getByTestId('filter-button'))
    await waitFor(() => screen.getByTestId('filter-menu'))
    expect(screen.getAllByTestId('filter-menuitem')).toHaveLength(2)
    expect(screen.getAllByTestId('filter-menuitem')[0]).toHaveClass(
      'Mui-selected'
    )
  })
  it('should fire "onUpdate" function when selecting a item', async () => {
    const props = {
      name: 'tester' as any,
      label: 'tester',
      items: ['item-1', 'item-2'],
      disabled: false,
      onUpdate: jest.fn(),
      selected: 'item-1',
    }
    render(<Filter {...props} />)

    fireEvent.click(screen.getByTestId('filter-button'))
    fireEvent.click(screen.getAllByTestId('filter-menuitem')[1])
    expect(props.onUpdate).toHaveBeenCalledTimes(1)
  })
})
