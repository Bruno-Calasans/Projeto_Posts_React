

import dom from 'react-dom/client'
import * as Home from './templates/home/index'

const root = dom.createRoot(document.getElementById('root'))
root.render(<Home.Posts/>)