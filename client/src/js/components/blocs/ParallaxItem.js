import $ from 'jquery'




/* PARALLAX ITEM
----------------------------------------------------------------------------------------------------*/

export default class ParallaxItem {

    constructor(item) {
        this.$item = $(item)
        this.ratio = this.$item.data('p')
        this.dir   = this.$item.data('d')
        this.pos   = this.$item.data('pos')


        this.getData()
    }




    /* Values
    ---------------------------------------------------------*/

    getData() {
        const modifier = (this.dir === 'both') ? 0.5 : 1

        this.offset = this.$item.offset().top
        this.height = this.$item.outerHeight()
        this.travel = (this.height * this.ratio) * modifier

        this.topThreshold = (this.dir === 'both') ? this.offset - this.travel : this.offset
        this.botThreshold = this.offset + this.height + this.travel

        this.span = this.botThreshold - this.topThreshold
    }



}



