import { Get, Controller, Render, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(
    private configService: ConfigService
  ) { }

  @Get()
  @Render('home.ejs')
  root(@Req() request: Request) {
    const baseUrl = this.configService.get<string>('baseUrl')
    return {
      baseUrl: baseUrl,
      url: baseUrl + request.url,
      siteName: 'Julien Lagneaux',
      page: {
        current: 'home',
        title: 'Julien Lagneaux - Community Manager',
        description: 'Julien Lagneaux, community manager freelance basé dans la région de Nantes',
        keywords: 'Julien Lagneaux,Community Manager,Social Media Manager,Réseaux Sociaux,Freelance,CM Freelance,Nantes,Freelance Nantes,Community Manager Nantes,CM Nantes,Rédaction web',
        nav: [
          {
            name: 'home',
            text: 'Bienvenue',
            link: ''
          },
          {
            name: 'about',
            text: 'à-propos',
            link: '#about'
          },
          {
            name: 'services',
            text: 'Services',
            link: '#services'
          },
          {
            name: 'references',
            text: 'Références',
            link: '#references'
          },
          {
            name: 'blog',
            text: 'Blog',
            link: 'https://blog.julienlagneaux.fr',
            external: true,
          },
          {
            name: 'contact',
            text: 'Contact',
            link: '#contact'
          },
        ],
      },

      about: {
        title: 'À propos',

        me: {
          title: 'Qui suis-je ?',
          content: [
            'Grand adepte des réseaux sociaux et fondateur de nombreux projets web depuis 2011, je suis un grand passionné de la rédaction, de la gestion de communauté ainsi que sa modération.',
            'Issu d’une forte culture geek et d’une formation en community management à l’IMCI, je mets aujourd’hui mes compétences et mon expérience à votre service.',
          ]
        },

        activity: {
          title: 'Mon activité',
          content: [
            'En tant que community manager freelance, je prends plaisir à accompagner chacun de mes clients en allant de la conception de la stratégie social media à l’animation de vos lives. Je mets mes compétences au profit d’entreprises de toutes tailles et de tous secteurs d’activités.',
            'Actuellement basé dans la région de Nantes, j’interviens dans toute la France en télétravail ou en Loire-Atlantique (pour d’autres destinations, contactez-moi et parlons-en).',
          ]
        },

        band: 'Diplômé de l\'Institut des Médias de la Communication sur Internet',
      },


      services: {
        title: 'Services',
        list: [
          {
            icon: 'strat',
            title: 'Stratégie Social Media',
            content: 'Besoin d’une stratégie pour investir les réseaux sociaux ou créer une nouvelle dynamique ? Je mets ma créativité à votre service et vous propose des idées sur-mesure.'
          },
          {
            icon: 'cm',
            title: 'Community<br/>management',
            content: 'Création de pages et profils, calendrier éditorial, programmation, reporting, modération, veille, je m’occupe de vos réseaux selon vos besoins.'
          },
          {
            icon: 'ereput',
            title: 'e-reputation',
            content: 'Envie de savoir ce que l’on dit de vous sur internet ? Ecoutons ensemble ce que disent vos clients pour améliorer la notoriété de votre marque.'
          },
          {
            icon: 'ads',
            title: 'Social Ads',
            content: 'Face aux baisses de reachs, je vous aide à faire les bons choix pour atteindre votre cible et vous permettre d’augmenter vos fans ou diffuser votre message plus massivement.'
          },
          {
            icon: 'games',
            title: 'Jeux Concours',
            content: 'Vous souhaitez créer de l’engagement ? Je vous aide à construire votre jeu concours autour d’idées créatives tout en respectant les CGU des réseaux sociaux.'
          },
          {
            icon: 'redac',
            title: 'Rédaction web',
            content: 'Besoin d’une belle plume ? Je mets mes talents à votre service tout en assurant le bon référencement naturel de vos textes !'
          },
          {
            icon: 'relations',
            title: 'Relations<br/>influenceurs',
            content: 'Pour augmenter votre notoriété, je me charge d’identifier et contacter les influenceurs correspondant à votre marque et à vos besoins.'
          },
          {
            icon: 'live',
            title: 'live',
            content: 'Je prépare votre live en amont et m’assure de son bon déroulement pour toucher votre audience en temps réel dans les meilleures conditions.'
          },
          {
            icon: 'need',
            title: 'un besoin<br/>particulier ?',
            content: 'Vous n’avez pas trouvé ce qu’il vous fallait ? Discutons de vos besoins. Contactez-moi et parlons-en.'
          },
        ],
      },


      qualities: {
        title: 'Qualités',
        list: [
          'Passionné',
          'Créatif',
          'Curieux',
          'Réactif'
        ]
      },


      'references': {
        title: 'Références',
        list: [
          {
            img: 'lhomme_a_vu_lours.png',
            title: "L'Homme a vu l'ours",
            link: 'https://www.lhommeavulours.fr/'
          },
          {
            img: 'entrecom.png',
            title: 'Entrecom',
            link: 'https://www.entrecom.com/'
          },
          {
            img: 'pchb.png',
            title: 'PCHB',
            link: 'http://www.pontchateau-handball.fr/'
          },
          {
            img: 'jcm.png',
            title: 'Journal du CM',
            link: 'https://www.journalducm.com/'
          },
        ],
        more: 'en voir plus ?',
      },


      opinions: {
        title: 'Avis',
        list: [
          {
            content: '"Julien fait partie de ces rares personnes qui allient passion, motivation et détermination. Il a su mettre en application ses acquis en temps réel et produire des résultats dans sa présence au sein des réseaux sociaux. La passion étant un vrai moteur dans ce métier, je recommande fortement Julien qui possède de nombreuses qualités."',
            img: '1.png',
            author: 'Laurent Bour, fondateur du Journal du CM',
          },
          {
            content: '"Julien a été un excellent curateur de contenus pour la veille de l\'agence, consciencieux dans sa veille, toujours à l\'affut des innovations et changements liés à l\'univers social media.<br/>Il a mené à bien les projets pour nos marques, ainsi que le développement de nouveaux supports social media friendly. Il fait preuve d\'une grande réactivité sur les projets et d\'une bonne appréhension des contextes clients. Il possède également une belle réactivité qui me fait le recommander."',
            img: '2.png',
            author: 'Clémence Aulas, Community Manager chez Entrecom',
          },
          {
            content: '"Julien est l\'un des meilleurs stagiaires que nous ayons rencontrés à l\'imci. La qualité de son travail, et sa créativité à toute épreuve sont ses meilleurs atouts. Aussi bon dans les tâches opérationnelles que dans les réalisations de concepts social media, il possède la rare faculté d\'avoir les deux casquettes tant prisées dans notre secteur. À savoir : penser et accomplir les stratégies réseaux sociaux de demain."',
            img: '3.png',
            author: 'Emeraude Lamiet, formatrice à l’IMCI',
          },
          {
            content: '"Attentif et volontaire avec le souhait de toujours bien faire, Julien a apporté de nombreuses idées et a su faire vivre notre page Facebook. Disponible, il nous a beaucoup aidé dans la création de support numérique, et dans la diffusion d’informations."',
            img: '4.png',
            author: 'Fanny, chargée de la communication pour Pontchâteau Handball',
          }
        ]
      },


      contact: {
        title: 'contactez-moi !',
        name: 'Nom',
        email: 'Email',
        subject: 'Sujet',
        message: 'Message',
        error: 'Votre formulaire n\'est pas valide.',
        success: 'Email envoyé',
        send: 'Envoyer',

        rs: {
          title: 'Retrouvez-moi aussi sur les réseaux sociaux',
          list: [
            {
              link: 'https://twitter.com/JulienLagneaux',
              icon: 'twitter'
            },
            {
              link: 'https://www.instagram.com/julienlagx',
              icon: 'instagram'
            },
            {
              link: 'https://www.linkedin.com/in/julienlagneaux',
              icon: 'linkedin'
            },
          ]
        }
      }
    };
  }
}
