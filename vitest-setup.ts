import type { Fetcher, FetchFn } from '@tanstack/start'
import { vi } from 'vitest'

export default function () {
  vi.mock('@tanstack/start', async (importOriginal) => {
    const original = await importOriginal()

    return {
      ...original,
      createServerFn: <TMethod extends 'GET' | 'POST', TPayload, TResponse>(
        _ignoredMethod: TMethod,
        fn: FetchFn<TPayload, TResponse>
      ) => fn as Fetcher<TPayload, TResponse>,
    }
  })
}