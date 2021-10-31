import $ from 'jquery'
import ParallaxController from './blocs/ParallaxController'




/* LAYOUT
----------------------------------------------------------------------------------------------------*/

export default class Layout {

    constructor() {
        this.getLayoutValues()
        this.getDocValues()
        this.pixelDensity = Math.min(window.devicePixelRatio, 2) || 1
        this.mouseHorFactor = 0
        this.mouseVerFactor = 0

        this.dragging      = false

        this.scrollTimer = null
        this.resizeTimer = null


        this.bindEvents()
        setTimeout(() => this.initChildren(), 0)
    }


    bindEvents() {
        // Window events
        $(window).on('resize', () => this.onResize())
        $(window).on('scroll', () => this.onScroll())


        // Input events
        $(document).on('mousemove', (e) => { this.onMouseMove(e) })
        $(document).on('touchend',  ()  => { this.dragging = false })

        document.addEventListener('touchmove', (e) => { this.onTouchMove(e) }, APP.Browser.supports.passive ? { passive: false } : false)
        document.addEventListener('wheel', e => this.onWheel(e))


        // Nav events
        $(APP.Router).on('pageWillChange', () => { this.onPageWillChange(APP.Router.page) })
        $(APP.Router).on('pageChangeEnd',  () => { this.onPageChangeEnd(APP.Router.page) })

        // Toggle Grid (dev purposes only)
        // $(document).on('keydown', (e) => {
        //     if (e.which === 71) {
        //         e.preventDefault()
        //         $('body').toggleClass('grid--visible')
        //     }
        // })
    }

    initChildren() {
        if (!APP.Browser.mobile)
            this.ParallaxController = new ParallaxController()
    }




    /* Handlers
    ---------------------------------------------------------*/

    onResize() {
        this.getLayoutValues()
        this.getDocValues()


        clearTimeout(this.resizeTimer)
        $('body').addClass('resizing')

        this.resizeTimer = setTimeout(() => $('body').removeClass('resizing'), 200)
    }


    onPageWillChange() {
        //
    }


    onPageChangeEnd() {
        //
    }


    onScroll() {
        this.scrollTop = $(window).scrollTop()

        clearTimeout(this.scrollTimer)
        $('body').addClass('scrolling')
        this.scrollTimer = setTimeout(() => $('body').removeClass('scrolling'), 100)

        //Update parallax items
        if (this.ParallaxController)
            this.ParallaxController.onScroll()
    }


    onWheel(e) {
        this.wheelDelta = -e.deltaY

        if (this.wheelDelta !== 0) {
            const direction = (this.wheelDelta > 0) ? 'up' : 'down'

            $(this).trigger('mouseWheel', [direction, this.wheelDelta])
        }
    }


    onTouchMove(e) {
        this.dragging = true
    }


    onMouseMove(e) {
        this.mouseX = e.pageX
        this.mouseY = e.pageY

        this.mouseHorFactor = (this.mouseX - (this.W / 2)) / (this.W / 2)
        this.mouseVerFactor = (this.mouseY - (this.H / 2)) / (this.H / 2)
    }




    /* Actions
    ---------------------------------------------------------*/




    /* Values
    ---------------------------------------------------------*/

    getDocValues() {
        this.docHeight = $(document).height()
        this.scrollTop = $(window).scrollTop()
    }


    getLayoutValues() {
        if (!this.baseH) this.baseH = window.innerHeight
        if (this.W) this.prevW = this.W


        this.W = window.innerWidth
        this.H = window.innerHeight
        this.M = (this.W <= 960)
    }

}



