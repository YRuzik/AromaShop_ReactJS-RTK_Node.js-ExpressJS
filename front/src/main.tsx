import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import './styles/buttons.css'
import './styles/common.css'
import './styles/paddings.css'
import './styles/specific.css'
import './styles/dimensions.css'
import './styles/inputs.css'
import {Provider} from "react-redux";
import {store} from "./utils/redux/store.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App/>
    </Provider>,
)
