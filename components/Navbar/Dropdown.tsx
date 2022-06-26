import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Web3Button, Web3Address } from '..'

// import { HeartIcon } from '../shared/icons/HeartIcon';
// import { LockIcon } from '../shared/icons/LockIcon';
// import { NotificationIcon } from '../shared/icons/NotificationIcon';
// import { UserIcon } from '../shared/icons/UserIcon';
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
import { darkTheme } from '../../shared/theme/darkTheme'
import { styled } from '@stitches/react'

// Stitches
import { keyframes } from '@stitches/react'

export const CardButton = styled(Button, {
  bc: 'gainsboro',
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

export const NavItem = ({ url, text, children }) => {
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
      }}
    >
      {children}
    </Card>
  )
}

const menuItems = [
  { key: 'new', name: 'New File' },
  { key: 'copy', name: 'Copy Link' },
  { key: 'edit', name: 'Edit File' },
  { key: 'delete', name: 'Delete File' },
]

const DropDown = () => {
  return (
    <Dropdown placement="bottom-left">
      <Dropdown.Trigger>
        <Text
          id="text"
          h5
          size={20}
          color="white"
          css={{ mt: 0, color: 'white', textAlign: 'left' }}
        >
          {"12345...abcde"}
        </Text>
      </Dropdown.Trigger>
      <Dropdown.Menu color="secondary" aria-label="Avatar Actions">
        <Dropdown.Item key="profile" css={{ height: '$18' }}>
          <Text b color="inherit" css={{ d: 'flex' }}>
            Signed in as
          </Text>
          <Text b color="inherit" css={{ d: 'flex' }}>
            zoey@example.com
          </Text>
        </Dropdown.Item>
        <Dropdown.Item key="settings" withDivider>
          My Settings
        </Dropdown.Item>
        <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
        <Dropdown.Item key="analytics" withDivider>
          Analytics
        </Dropdown.Item>
        <Dropdown.Item key="system">System</Dropdown.Item>
        <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
        <Dropdown.Item key="help_and_feedback" withDivider>
          Help & Feedback
        </Dropdown.Item>
        <Dropdown.Item key="logout" color="error" withDivider>
          Log Out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

const NavBar = () => {
  const { setTheme } = useNextTheme()

  const { theme, isDark, type, Text } = useTheme()
  setTheme('dark')
  console.log('{ theme,isDark, type } :', { theme, isDark, type })

  return (
    <>
      <Grid.Container
        gap={0.2}
        justify="space-evenly"
        css={{
          py: '0',
          my: '0',
          color: 'white',
          bcColor: '$colors$primaryBorder',
        }}
      >
        <Grid xs={0} md={0}>
          <NavItem url="/whales" text="大戶清單">
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
        <Grid xs={1} md={1}>
          <NavItem url="/whales" text="大戶清單">
            <Button
              as="div"
              auto
              color="gradient"
              ghost
              css={{ flexGrow: '2' }}
            >
              <AiFillHome />
            </Button>
          </NavItem>
        </Grid>
        <Grid xs={8}>
          <NavItem url="/whales" text="大戶清單">
            <NavItem url="/whales" text="大戶清單">
              <Button
                as="div"
                auto
                color="gradient"
                ghost
                css={{ flexGrow: '2' }}
              >
                大戶清單
              </Button>
              <Button
                as="div"
                auto
                color="gradient"
                ghost
                css={{ flexGrow: '2' }}
              >
                我的跟單
              </Button>
              <Button
                as="div"
                auto
                color="gradient"
                ghost
                css={{ flexGrow: '2' }}
              >
                錢包管理
              </Button>
            </NavItem>
          </NavItem>
        </Grid>
        <Grid xs={2}>
          <NavItem url="/wallet" text="錢包管理">
            <DropDown />
          </NavItem>
        </Grid>
      </Grid.Container>
    </>
  )
}

export default NavBar
