import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Web3Button, Web3Address } from '../components/'

import { useTheme as useNextTheme } from 'next-themes'
import { useTheme } from '@nextui-org/react'

// UI
import { Container } from '@nextui-org/react'
import { darkTheme } from '../shared/theme/darkTheme'
import { styled } from '@stitches/react'

// Stitches
import { keyframes } from '@stitches/react';

const fadeIn = keyframes({
  '0%': { opacity: '0' },
  '100%': { opacity: '1' },
});

const Home: NextPage = () => {
  const { setTheme } = useNextTheme()
  const { theme, isDark, type } = useTheme()

  const AppContainer = styled(Container, {
    [`.${darkTheme} &`]: {
      bc: '$tokenColor',
      color: 'myColor'
    },
    color: theme?.colors.bcContrast.value,
    bcColor: theme?.colors.bc.value
    // animationName: fadeIn
  })

  return (
    <AppContainer fluid>
        <div className="flex h-screen flex-col">
          <Head>
            <title>NFT bot</title>
            <meta name="description" content="Boilerplate for Web3 dApp" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <nav className="flex flex-row justify-between p-4">
            <Link href="/about">
              <a className="text-lg font-light">About</a>
            </Link>
            <Web3Button />
          </nav>

          <main className="grow p-8 text-center">
            <h1 className="pb-8 text-4xl font-bold">NFT BOT</h1>
            <Web3Address />
          </main>

          <footer className="justify-end p-4">
            <p className="text-lg font-light">Footer</p>
          </footer>
        </div>
    </AppContainer>
  )
}

export default Home
