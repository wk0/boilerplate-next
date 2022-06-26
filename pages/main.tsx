import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Web3Button, Web3Address } from '../components'

import NavBar from '../components/Navbar/Navbar'

// UI
import {
  Container,
  Grid,
  Col,
  Row,
  Card,
  Text,
  Button,
  Link as LinkContainer,
  Spacer,
} from '@nextui-org/react'
import { darkTheme } from '../shared/theme/darkTheme'
import { styled } from '@stitches/react'

// Theme
import { useTheme as useNextTheme } from 'next-themes'
import { useTheme } from '@nextui-org/react'

// Stitches
import { keyframes } from '@stitches/react'

const fadeIn = keyframes({
  '0%': { opacity: '0' },
  '100%': { opacity: '1' },
})

export const AppContainer = styled(Container, {
  [`.${darkTheme} &`]: {
    bc: '$tokenColor',
    color: '$myColor',
  },
  // color: '$myColor',
  // bcColor: '$myColor'
  color: '$bc',
  bcColor: 'blue50',
  // animationName: fadeIn
})

export const CardButton = styled(Button, {
  bcColor: 'gainsboro',
  // borderRadius: '9999px',
  fontSize: '13px',
  heigth: '100%',
  margin: '0',
  padding: '10px 15px',
  '&:hover': {
    bc: '$colors$primary',
  },
  '&:active': {
    bc: '$colors$primary',
  },
})

export const MockItem = ({ url, text }) => {
  return (
    <Card
      isPressable
      isHoverable
      variant="bordered"
      id="Card"
      css={{
        h: '$22',
        justyContent: 'center',
        color: '$primary-100',
        backgroundColor: '$info-600',
        // $$cardColor: '$colors$primary',
        '&:hover': {
          backgroundColor: '$info-300',
        },
      }}
    >
      <Card.Body id="CardBody" css={{ justyContent: 'center' }}>
        <LinkContainer
          id="LinkContainer"
          css={{
            m: 0,
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          <Link href={url}>
            <Text
              id="text"
              h3
              size={30}
              color="white"
              css={{ mt: 0, color: '$primary-100', textAlign: 'center' }}
            >
              {text}
            </Text>
          </Link>
        </LinkContainer>
      </Card.Body>
    </Card>
  )
}

const AddressSection = () => {
  return (
    <Card css={{ dflex: 'center', pb: '5' }}>
      <Card.Header css={{ dflex: 'center' }}>
        <Text
          h1
          size="2.8rem"
          css={{
            textGradient: '45deg, $yellow600 -20%, $red600 100%',
          }}
          weight="bold"
        >
          NFT.bot
        </Text>
      </Card.Header>
      <Card.Body>
      <Text
        h3
        size="1.6rem"
        css={{
          textGradient: '180deg, $blue600 -50%, $pink600 50%',
          mb:'$4'
        }}
        weight="bold"
      >
        我的錢包地址
      </Text>
        <Card variant="bordered" css={{ mw: '400px',color:'$primary-100',backgroundColor:'$primary-600' }}>
          <Card.Body>
            <Text
              h1
              size="1.4rem"
              css={{
                // textGradient: '45deg, $primary-100 -20%, $primary-100 100%',
                color:'$primary-100'
              }}
              weight="bold"
            >
              {'12345678901-abcdefghijk'}
            </Text>
          </Card.Body>
        </Card>
      </Card.Body>
    </Card>
  )
}

const About: NextPage = () => {
  const { setTheme } = useNextTheme()
  const { theme, isDark, type, Text } = useTheme()
  setTheme('dark')
  console.log('{ theme,isDark, type } :', { theme, isDark, type })

  return (
    <>
      <NavBar></NavBar>
      <Spacer y={1} />
      <AppContainer fluid css={{ color:'blue', backgroundColor: 'transparent' }}>
        <AddressSection />
        <Spacer y={0.3} />
        <Grid.Container gap={2} justify="center">
          <Grid xs={12} md={4}>
            <MockItem url="/whales" text="大戶清單" />
          </Grid>
          <Grid xs={12} md={4}>
            <MockItem url="/trace" text="我的跟單" />
          </Grid>
          <Grid xs={12} md={4}>
            <MockItem url="/wallet" text="錢包管理" />
          </Grid>
        </Grid.Container>
      </AppContainer>
    </>
  )
}

export default About
