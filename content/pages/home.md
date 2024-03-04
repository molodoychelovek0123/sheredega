---
title: Главная
blocks:
  - images:
      - src: /uploads/slider-image-0.jpg
        alt: 'Sheredega - Hero image '
      - src: /uploads/slider-image-1.jpg
        alt: 'Sheredega Hero Image - 2 '
    title:
      heading: Заголовок
      color: white
      size: '120'
      seoSize: '1'
    _template: sheredegaHero
  - indent:
      desktopTop: 120
      desktopBottom: 103
      tabletTop: 110
      tabletBottom: 67
      mobileTop: 100
      mobileBottom: 67
    grid:
      mobileColumns: '2'
      tabletColumns: '6'
      desktopColumns: '6'
    textBlock:
      title: ''
      hideTitleOnMobile: true
      body: >
        Мы — проектно-консалтинговое бюро Sheredega Consulting.\

        \

        **Наша миссия — развитие**\

        и преображение городских территорий\

        \\


        <animated animatedWords={["Девелоперская концепция", "Работа",
        "Разработка"]} />
      fontSize: '40'
      textStart: '3'
      animation:
        type: half-fadeIn
        isScroll: false
        speed: slower
        showOnce: false
    customCss:
      data: ''
    _template: gridText
  - indent:
      desktopTop: 0
      desktopBottom: 120
      tabletTop: 0
      tabletBottom: 110
      mobileTop: 0
      mobileBottom: 100
    grid:
      mobileColumns: '2'
      tabletColumns: '6'
      desktopColumns: '6'
    numbers:
      - numberValue: 62
        text: Реализованных проекта
      - numberValue: 45
        text: Городов
      - numberValue: 2
        numberUnit: млрд
        text: руб. привлеченного финансирования
    animation:
      type: fadeInUp
      isScroll: false
      speed: faster
    _template: numbers
  - headline: Welcome to the Tina Starter
    text: >
      This project is set up to show you the basics of working with Tina. You're
      looking at the landing page, which pulls content from
      `content/pages/home.md`, components from components/blocks, and puts them
      all together in `pages/[filename].tsx`, all based on a config
      `tina/config.tsx`.
    actions:
      - label: Get Started
        type: button
        icon: true
        link: /posts
      - label: Read Blog
        type: link
        icon: false
        link: /posts
    image:
      src: /uploads/unsplash-75EFpyXu3Wg.jpg
      alt: >-
        Photo of palm trees at sunset by Adam Birkett -
        unsplash.com/photos/75EFpyXu3Wg
    color: default
    _template: hero
  - items:
      - icon:
          name: BiCodeBlock
          color: red
          style: float
        title: Amazing Feature
        text: >-
          Aliquam blandit felis rhoncus, eleifend ipsum in, condimentum nibh.
          Praesent ac faucibus risus, eu lacinia enim.
      - icon:
          name: BiLike
          color: primary
          style: float
        title: This Is a Feature
        text: Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.
      - icon:
          name: BiPalette
          color: green
          style: float
        title: Configurable Theme
        text: >-
          Edit global theme configuration with Tina. Change your theme's primary
          color, font, or icon set.
    color: tint
    _template: features
  - quote: >-
      There are only two hard things in Computer Science: cache invalidation and
      naming things.
    author: Phil Karlton
    color: primary
    _template: testimonial
  - indent:
      desktopTop: 60
      desktopBottom: 60
      tabletTop: 40
      tabletBottom: 40
      mobileTop: 20
      mobileBottom: 20
    grid:
      mobileColumns: '1'
      tabletColumns: '3'
      desktopColumns: '3'
    images:
      - src: /uploads/llama-6.avif
        alt: Изображение
      - src: /uploads/llama-3.avif
        alt: Изображение
      - src: /uploads/llama-2.avif
        alt: Изображение
    _template: gridImage
---

