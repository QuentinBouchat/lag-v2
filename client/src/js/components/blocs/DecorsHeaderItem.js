import $ from 'jquery'
import TweenMax from 'gsap'




/* DECORS HEADER ITEM
----------------------------------------------------------------------------------------------------*/

export default class DecorsHeaderItem {

    constructor(item) {
        this.$item = $(item)
        this.param = this.$item.data('float')
        this.x = 0
        this.y = 0
    }




    /* HANDLERS */

    updatePosition() {
        this.x = ((-10 + 2*Math.random()*10) + 13*this.x)/15
        this.y = ((-10 + 2*Math.random()*10) + 13*this.y)/15

        let mouseVer = APP.Layout.mouseVerFactor

        if(mouseVer > 1) {
            mouseVer = 1
        }

        TweenMax.to(this.$item, 0.5, { y: (this.y + mouseVer*10)*this.param, x: (this.x + APP.Layout.mouseHorFactor*10)*this.param, force3D: true, ease: Cubic.ease })
    }



}



