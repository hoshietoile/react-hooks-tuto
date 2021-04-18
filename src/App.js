import './App.css'
// dependencies
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// pages
import IndexPage from './components/pages/IndexPage'
import EditorPage from './components/pages/EditorPage'
import MyListPage from './components/pages/MyListPage'
import NotFoundPage from './components/pages/NotFoundPage'

// TODO: ドロワーの開閉などのステート管理できるプロバイダ
const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={IndexPage} exact />
          <Route path="/editor" component={EditorPage} exact />
          <Route path="/mylist" component={MyListPage} exact />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
