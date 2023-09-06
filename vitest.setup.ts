// import { beforeAll, afterAll, afterEach } from 'vitest'
// import { server } from './src/mocks/server';
// beforeAll(() => {
//   server.listen()
// })
// afterEach(() => {
//   server.resetHandlers()
// })
// afterAll(() => {
//   server.close()
// })

// import 'fake-indexeddb/auto'
import {
  VueRouterMock,
  createRouterMock,
  injectRouterMock,
} from 'vue-router-mock'
import { beforeEach, vi } from 'vitest'
import { config } from '@vue/test-utils'

function setupRouterMock() {
  const router = createRouterMock({
    spy: {
      create: fn => vi.fn(fn),
      reset: spy => spy.mockClear(),
    },
  })

  beforeEach(() => {
    router.reset()
    injectRouterMock(router)
  })

  config.plugins.VueWrapper.install(VueRouterMock)
}

setupRouterMock()