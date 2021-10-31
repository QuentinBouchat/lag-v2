import axios from 'axios'
import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper'
import TweenMax from 'gsap'
import '../vendors/ScrollToPlugin'
import DecorsHeaderItem from './blocs/DecorsHeaderItem'




/* Home
----------------------------------------------------------------------------------------------------*/

export default class Home {

    constructor() {
        this.sended = false
        this.$els = {
            decos: $('[data-float]'),
            contactForm: $('.contact__form'),
            contactFormError: $('.contact__error'),
            contactFormSuccess: $('.contact__success'),
        }
        this.bindEvents()
        setTimeout(() => this.init(), 0)
    }


    bindEvents() {
        $(document).on('click', '.header__nav__item a', (e) => {
            const $this = $(e.currentTarget)
            if ($this.attr('target')) {
                return
            }
            e.preventDefault()
            const href  = $this.attr('href')
            if (href) {
                const offsetY = !APP.Browser.mobile && href === '#about' ? 120 : 0
                TweenMax.to(window, 0.4, { scrollTo: { y: href, offsetY: offsetY, autoKill:false }, ease: Cubic.easeInOut })
            }
        })

        this.$els.contactForm.on('submit', (e) => {
            e.preventDefault()
            this.sendContactForm(e.target)
        })
    }




    /* Actions
    ---------------------------------------------------------*/

    init() {
        new Swiper('.swiper-container', {
            direction: 'horizontal',
            loop: true,

            navigation: {
                nextEl: '.swiper__btn__next',
                prevEl: '.swiper__btn__previous',
            },
        })

        if (!APP.Browser.mobile) {
            this.decors = []
            this.$els.decos.each((i, e) => {
                this.decors.push(new DecorsHeaderItem(e))
            })

            setInterval(() => this.updateDecosHeader(), 50)
        }
    }

    updateDecosHeader() {
        this.decors.forEach((e) => {
            e.updatePosition()
        })
    }

    async sendContactForm(form) {
        if (this.sended) {
            return
        }
        this.$els.contactFormError.addClass('hidden-visually')

        const formData = new FormData(form)
        const name = formData.get('name')
        const email = formData.get('email')
        const subject = formData.get('subject')
        const message = formData.get('message')
        console.log(name, email, subject, message)

        try {
            const { data } = await axios.post('/api/contact', {
                name,
                email,
                subject,
                message
            })
            this.$els.contactFormSuccess.removeClass('hidden-visually')
            this.sended = true
        } catch {
            this.$els.contactFormError.removeClass('hidden-visually')
        }
    }




    /* Events
    ---------------------------------------------------------*/




}



