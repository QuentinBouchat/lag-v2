import $ from 'jquery'
import TweenMax from 'gsap'
import ParallaxItem from './ParallaxItem'




/* PARALLAX ITEM
----------------------------------------------------------------------------------------------------*/

export default class ParallaxController {

    constructor() {
        this.getItems()
    }




    /* Handlers
    ---------------------------------------------------------*/

    onScroll(dur = 0.4) {
        const scrollTop = APP.Layout.scrollTop
        const bottom = scrollTop + APP.Layout.H

        this.items.forEach((e) => {
            const t = e.topThreshold
            const b = e.botThreshold
            const d = e.dir
            const c = e.pos

            const travel = e.travel

            const p = (c === 'center') ? (scrollTop / b) : (bottom - t) / b
            const finalP = Math.max(Math.min(p, 1), 0)

            const transY = (d === 'both') ? ((finalP - 0.5) * travel) : (finalP * travel)

            TweenMax.to(e.$item, dur, { y: transY, force3D: true, ease: Cubic.easeOut })
        })
    }




    /* Values
    ---------------------------------------------------------*/

    getItems() {
        this.items = []
        $('[data-p]')
            .each((i, e) => {
                this.items.push(new ParallaxItem(e))
            })

        this.onScroll(0)
    }



}



