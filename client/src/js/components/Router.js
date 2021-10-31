import $ from 'jquery'
import RouteParser from 'route-parser'




/* ROUTER
----------------------------------------------------------------------------------------------------*/

export default class Router {

    constructor() {
        this.slug  = document.location.pathname + document.location.search
        this.route = new RouteParser('/(:page)(/:sub)')
        this.page  = this.getDestination(this.slug)
        this.same  = false

        this.preloading    = true
        this.transitioning = true


        // Avoid automatic scrolltop on popstate
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual'
        }


        // Kickstart navigation
        this.startNav()
    }




    /* Navigation & Routing
    ---------------------------------------------------------*/

    startNav() {
        // Bind events
        $(window).on('load', () => {
            this.preload()
            this.onPageLoad()
        })


        // Intercept internal links clicks
        $(document).on('click', 'a', (e) => {
            const $this = $(e.currentTarget)
            const href  = $this.attr('href')

            // Cancel if special link
            if ($this.attr('target') === '_blank'
                || href.indexOf('mailto:') >= 0
                || href.indexOf('tel:') >= 0) return


            // Cancel if special user behavior
            if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return


            e.preventDefault()
            if (APP.Layout.dragging) return


            const delay = 0
            const slug  = href
            const dest  = this.getDestination(slug)


            setTimeout(() => this.goto(dest, slug, true), delay)
        })


        // Intercept popstate
        window.onpopstate = (e) => {
            if (e.state === null || this.transitioning) return

            const dest = (e.state.dest === 'home') ? 'home' : e.state.dest
            const slug = (e.state.dest === 'home') ? '/'    : e.state.slug

            if (slug !== this.slug) {
                this.goto(dest, slug, false)
            }
        }


        history.pushState({ dest: this.page, slug: this.slug }, '', this.slug)
    }


    getDestination(slug) {
        this.subPage = null
        let dest     = null
        const hash   = this.route.match(slug)

        if (!hash.sub) {
            switch (hash.page) {
                case 'projects' : dest = 'projects'; break
                case 'news'     : dest = 'news';     break
                case 'about'    : dest = 'about';    break
                case 'contact'  : dest = 'contact';  break
                case undefined :
                default : dest = 'home'; break
            }
        } else {
            switch (hash.page) {
                default : dest = 'home'; break
            }
        }

        return dest
    }


    onPageLoad() {
        this.transitioning = false
        this.initPage(this.page)

        $('body').removeClass('transitioning')
        $(this).trigger('transitionEnded')
    }




    /* Actions
    ---------------------------------------------------------*/

    initPage(page) {
        //
    }


    goto(dest, slug, pushState) {
        if (this.transitioning || slug === this.slug) return


        // Set nav data
        this.prevPage = this.page
        this.page     = dest
        this.slug     = slug
        this.same     = this.page === this.prevPage


        // Turn transition on
        this.transitioning = true
        $(this).trigger('pageWillChange')
        $('body').addClass('transitioning')


        const loadDelay = 0

        // Load new page
        setTimeout(() => {
             // Update history if necessary
            if (pushState) {
                history.pushState({ dest: dest, slug: slug }, '', slug)
            }

            this.loadPage(dest, slug)
        }, loadDelay)
    }


    loadPage(dest, slug) {
        const delay = this.getTransitionDelay(dest, this.prevPage)

        const parentCtn = $('.content__wrapper')


        // Load page in virtual element
        this.$oldCtn = $('.content__inner')
        this.$oldCtn.addClass('| is--going')
        const $tempCtn = $('<div>')


        // Load new content
        $tempCtn.load(slug, () => {
            $('body').attr('data-page', dest)


            // Change page title
            document.title = $tempCtn.find('title').text()


            // Get new page content
            this.$newCtn = $('<div class="content__inner | is--coming">').html($tempCtn.find('.content__inner').html())


            // Replace page content
            parentCtn.append(this.$newCtn)


            // End transition & trigger event
            this.endTransition(delay)


            // Track pageview
            this.track(slug)
        })
    }


    endTransition(delay = 0) {
        setTimeout(() => {
            this.$newCtn.removeClass('| is--coming is--same')
        }, delay / 2)

        setTimeout(() => {
            this.onPageLoad()
            this.$oldCtn.remove()
            $(this).trigger('pageChangeEnd')
        }, delay)
    }




    /* Preloader
    ---------------------------------------------------------*/

    preload() {
        setTimeout(() => {
            this.preloading = false
            $('body').removeClass('intro')
            $(this).trigger('preloadEnd')
        }, 3000)

        setTimeout(() => {
            $('body').removeClass('intro-transition')
        }, 4500)
    }




    /* Values
    ---------------------------------------------------------*/

    getTransitionDelay(dest, prev) {
        let delay = 0

        switch (dest) {
            default: delay = 0; break
        }

        return delay
    }




    /* Analytics
    ---------------------------------------------------------*/

    track(slug) {
        if (typeof ga !== 'undefined') {
            ga('send', 'pageview', slug)
        }
    }

}



