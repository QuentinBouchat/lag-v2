/*-----------------------------------------------------------------------------------*/
            /*  00. COMPONENTS IMPORTS
/*-----------------------------------------------------------------------------------*/

import Browser from './components/Browser'
import Layout from './components/Layout'
import Home from './components/Home'

const APP = window.APP || {}




/*-----------------------------------------------------------------------------------*/
            /*  01. INIT
/*-----------------------------------------------------------------------------------*/

const initApp = () => {
    window.APP = APP

    APP.Browser = new Browser()
    //APP.Router  = new Router()
    APP.Layout  = new Layout()
    APP.Home = new Home()
}

if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    initApp()
} else {
    document.addEventListener('DOMContentLoaded', initApp)
}



