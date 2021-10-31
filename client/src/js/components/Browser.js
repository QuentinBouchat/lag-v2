
/* BROWSER
----------------------------------------------------------------------------------------------------*/

export default class Browser {

    constructor() {
        this.supports = {}

        this.mobile    = (/iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
        this.Chrome    = navigator.userAgent.indexOf('Chrome') > -1
        this.Explorer  = navigator.userAgent.indexOf('MSIE') > -1
        this.IE10      = navigator.appVersion.indexOf('MSIE 10') > -1
        this.Edge      = /(?:\b(MS)?IE\s+|\bTrident\/7\.0;.*\s+rv:|\bEdge\/)(\d+)/.test(navigator.userAgent)
        this.Firefox   = navigator.userAgent.indexOf('Firefox') > -1
        this.Safari    = navigator.userAgent.indexOf('Safari') > -1
        this.Opera     = navigator.userAgent.indexOf('Presto') > -1
        this.Android   = (navigator.userAgent).toLowerCase().indexOf('android') > -1
        this.iOS       = navigator.userAgent.match(/(iPad|iPhone|iPod)/g)


        if (this.Edge && navigator.userAgent.indexOf('Trident/') > -1) {
            this.Edge = false
            this.IE11 = true
        }

        // Specificities
        if (this.Chrome && this.Safari) { this.Safari = false }
        this.SafariDesktop = (!this.mobile && this.Safari)

        this.iPad   = (/iPad/i.test(navigator.userAgent))
        this.iPhone = (/iPhone|iPod/i.test(navigator.userAgent))

        this.webApp = window.navigator.standalone

        this.addBrowserClass()
        this.detectFeatures()
    }


    // Add relevant class(es)
    addBrowserClass() {
        if (this.mobile)   document.documentElement.classList.add('mobile')
        if (this.Android)  document.documentElement.classList.add('android')
        if (this.iOS)      document.documentElement.classList.add('iOS')

        if (this.Firefox)  document.documentElement.classList.add('firefox')
        if (this.Safari)   document.documentElement.classList.add('safari')
        if (this.Chrome)   document.documentElement.classList.add('chrome')
        if (this.Explorer) document.documentElement.classList.add('ie')
        if (this.Edge)     document.documentElement.classList.add('edge')
        if (this.IE10)     document.documentElement.classList.add('ie10')
        if (this.IE11)     document.documentElement.classList.add('ie11')

        if (this.webApp)   document.documentElement.classList.add('webapp')
    }


    detectFeatures() {
        let supportsPassive = false

        try {
            const opts = Object.defineProperty({}, 'passive', {
                get: () => {
                    supportsPassive = true
                },
            })

            window.addEventListener('test', null, opts)
        } catch (e) {
            //
        }

        this.supports.passive = supportsPassive
    }

}