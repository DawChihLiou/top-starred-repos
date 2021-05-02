import { useState, useCallback, useEffect } from 'react'
import { omit } from 'lodash'
import { LocalStorageDriver } from '@services/StorageDriver'

/**
 * - `key` is a `string` that represents the full name of a repository.
 * - `value` is a `number` that represents the additional star given from the user.
 */
type Storage = Record<string, number>

const storageDriver = new LocalStorageDriver('gh-repo-stars')

export function useStar() {
  const [starredRepoNames, setStarredRepoNames] = useState<Storage>({})
  /**
   * @param name Full name of the repository
   * @return callback function that binds given repo name and update `starredRepoNames`.
   */
  const starRepo = useCallback(
    (name: string) => () => {
      let pending: Storage
      if (starredRepoNames[name]) {
        pending = omit(starredRepoNames, [name])
      } else {
        pending = { ...starredRepoNames, [name]: 1 }
      }
      setStarredRepoNames(pending)
    },
    [starredRepoNames]
  )
  /**
   * Save starred repo data from storage in the state when component is mounted.
   */
  useEffect(() => {
    const storage = storageDriver.read<Storage>()
    if (storage) {
      setStarredRepoNames(storage)
    }
  }, [])
  /**
   * Save starred repo to storage when state is updated.
   */
  useEffect(() => {
    storageDriver.write(starredRepoNames)
  }, [starredRepoNames])

  return { starredRepoNames, starRepo }
}
