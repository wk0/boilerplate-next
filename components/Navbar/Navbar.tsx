import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Web3Button, Web3Address } from '..'

import React from 'react'

import { AiFillHome } from 'react-icons/ai'
import { useTheme as useNextTheme } from 'next-themes'
import { useTheme } from '@nextui-org/react'

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
  Avatar,
  Dropdown,
} from '@nextui-org/react'

export const NavItem = ({ children }) => {
  return (
    <Card
      id="NavCard"
      css={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: '0.1',
      }}
    >
      {children}
    </Card>
  )
}

const NavMenu = () => {
  return (
    <NavItem>
      <Button
        auto
        color="gradient"
        ghost
        css={{ flexShrink: '1', flexGrow: '2' }}
      >
        <Text size="1.2rem">{'大戶清單'}</Text>
      </Button>
      <Button
        auto
        color="gradient"
        ghost
        css={{ flexShrink: '1', flexGrow: '2' }}
      >
        <Text size="1.2rem">{'我的跟單'}</Text>
      </Button>
      <Button
        auto
        color="gradient"
        ghost
        css={{ flexShrink: '1', flexGrow: '2' }}
      >
        <Text size="1.2rem">{'錢包管理'}</Text>
      </Button>
    </NavItem>
  )
}

const DropDown = () => {
  const { setTheme } = useNextTheme()

  return (
    <Dropdown placement="bottom-right">
      <Dropdown.Trigger>
        <Button
          auto
          // ghost
          bordered
          // color='gradient'
          css={{
            width: '100%',
            // color: '$buttonHover-100',
            color: 'linear-gradient(112deg, $blue100 -25%, $pink100 -10%, $purple200 80%)',
            // bcColor: '$colors$primaryBorder',
            // backgroundColor: '$gray100',
            backgroundColor: '$backgroundContrast',
            '&:hover': {
              color:'$accents0',
              // backgroundImage: 'linear-gradient(to right, #1fa2ff, #12d8fa, #a6ffcb)',
              backgroundImage: 'linear-gradient(#e66465, #9198e5);',
              backgroundColor: '$buttonHover-100',
              // backgroundColor: '$primary-500',
            },
          }}
        >
          <Text
            id="text"
            h5
            size="1.3rem"
            color="white"
            css={{ mt: 0, color: 'white', textAlign: 'left' }}
          >
            {'12345...abcde'}
          </Text>
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Menu
        color="secondary"
        aria-label="Avatar Actions"
        disabledKeys={['settings', 'help_and_feedback']}
      >
        <Dropdown.Item key="profile" css={{ height: '$18' }}>
          <Text b color="inherit" css={{ d: 'flex' }}>
            我的錢包地址
          </Text>
          <Text b color="inherit" css={{ d: 'flex' }}>
            12345678901112abcdefgh
          </Text>
        </Dropdown.Item>
        <Dropdown.Item key="darkmode" withDivider onpress={(theme)=>{setTheme(theme)}}>
          {"深色模式:ON"}
        </Dropdown.Item>
        <Dropdown.Item key="logout" color="error" withDivider>
          登出
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

const NavBar = () => {
  const { setTheme } = useNextTheme()
  const { theme, isDark, type } = useTheme()
  setTheme('dark')
  console.log('{ theme,isDark, type } :', { theme, isDark, type })
  return (
    <>
      <Grid.Container
        gap={0.5}
        justify="space-evenly"
        css={{
          py: '0',
          my: '0',
          color: 'white',
          bcColor: '$colors$primaryBorder',
        }}
      >
        <Grid xs={0} md={0}>
          <NavItem>
            <Button
              as="div"
              auto
              color="gradient"
              ghost
              css={{ flexGrow: '2' }}
            >
              <AiFillHome />
            </Button>

            {/* </Button.Group> */}
          </NavItem>
        </Grid>
        <Grid xs={2} sm={2} md={1}>
          <NavItem>
            <Button
              as="div"
              auto
              color="gradient"
              ghost
              css={{ flexGrow: '2' }}
            >
              <AiFillHome size="1.8rem" />
            </Button>
          </NavItem>
        </Grid>
        <Grid xs={10} sm={8} md={9}>
          <NavMenu />
        </Grid>
        <Grid xs={12} sm={2}>
          <NavItem>
            <DropDown />
          </NavItem>
        </Grid>
      </Grid.Container>
    </>
  )
}

export default NavBar
