import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    container: {
      center: true,
      padding: '0.75rem', //16*0.75=12
      screens: {
        'ssm': '100%',
        'sm': '100%',
        'md': '100%',
        'lg': '100%',
        'xl': '100%',
        '2xl': '1320px'
      }
    },
    fontFamily: {
      'Noto-Serif-TC': ["Noto Serif TC", "serif"]

    },
    screens: {
      'ssm': '375px',
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1320px',
      '3xl': "1550px",
      '4xl': '1700px',
      '5xl': '1944px'
    },
    extend: {
      backgroundImage: {
        'home-about': "url('@/assets/images/desktop/home-about.png')",
        'user-nav': "url(@/assets/images/desktop/profile-hero.png)"
      },
      colors: {
        primary: {
          120: "#7B6651", //Dark
          base: "#BF9D7D", //Base
          80: "#D0B79F",
          60: "#E1D1C2",
          40: "#F1EAE4",
          Tint: "#FAF7F5",
        },
        success: {
          120: "#299F65", //Dark
          base: "#52DD7E", //Base
          20: "#BCFBBD",
          10: "#E8FEE7",
        },
        info: {
          120: "#1D66AC", //Dark
          base: "#3BADEF", //Base
          20: "#B1EFFD",
          10: "#E6FBFE",
        },
        alert: {
          120: "#C22538", //Dark
          base: "#DA3E51", //Base
          20: "#F5CCD1",
          10: "#FDECEF",
        }
      }
    }
  },
  plugins: []
}