import { Application } from '../../application'
import { PreviewPage } from '../preview-page'
import {
  AntdV5Plugin,
  DashboardBuildinPlugin,
  KxgcAuthPlugin,
} from '@/plugins'

import { isProduct } from '@/env'

const application = new Application({
  providers: [],
  plugins: [AntdV5Plugin, DashboardBuildinPlugin, KxgcAuthPlugin],
  designable: false,
  components: {},

  router: {
    basename: isProduct ? '/dashboard-report' : '/report',
    type: 'browser',
    routes: {
      preview: {
        path: '/:shareURL',
        Component: PreviewPage,
      },
    },
  },
})

const App = application.getRootComponent()

export default App
