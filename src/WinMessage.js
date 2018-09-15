import React from 'react'
import styled from 'styled-components'
import Transition from 'react-transition-group/Transition'
import a from './win_icons/1f44c-1f3fb.png'
import b from './win_icons/1f44c-1f3fc.png'
import c from './win_icons/1f44c-1f3fd.png'
import d from './win_icons/1f44c-1f3fe.png'
import e from './win_icons/1f44c-1f3ff.png'
import f from './win_icons/1f44c.png'
import g from './win_icons/1f44d-1f3fb.png'
import h from './win_icons/1f44d-1f3fc.png'
import i from './win_icons/1f44d-1f3fd.png'
import j from './win_icons/1f44d-1f3fe.png'
import k from './win_icons/1f44d-1f3ff.png'
import l from './win_icons/1f44d.png'
import m from './win_icons/1f44f-1f3fb.png'
import n from './win_icons/1f44f-1f3fc.png'
import o from './win_icons/1f44f-1f3fd.png'
import p from './win_icons/1f44f-1f3fe.png'
import q from './win_icons/1f44f-1f3ff.png'
import s from './win_icons/1f44f.png'
import t from './win_icons/1f91f-1f3fb.png'
import u from './win_icons/1f91f-1f3fc.png'
import v from './win_icons/1f91f-1f3fd.png'
import w from './win_icons/1f91f-1f3fe.png'
import x from './win_icons/1f91f-1f3ff.png'
import y from './win_icons/1f91f.png'
import z from './win_icons/270c-1f3fb.png'
import aa from './win_icons/270c-1f3fc.png'
import ab from './win_icons/270c-1f3fd.png'
import ac from './win_icons/270c-1f3fe.png'
import ad from './win_icons/270c-1f3ff.png'
import ae from './win_icons/270c.png'

const icons = [
  a,
  b,
  c,
  d,
  e,
  f,
  g,
  h,
  i,
  j,
  k,
  l,
  m,
  n,
  o,
  p,
  q,
  s,
  t,
  u,
  v,
  w,
  x,
  y,
  z,
  aa,
  ab,
  ac,
  ad,
  ae,
]

const messages = [
  'WELL DONE',
  'YOU ROCK',
  'AMAZING',
  'SO GOOD',
  'GREAT',
  "YOU'RE ON FIRE",
]

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: #2ecc71;
  width: 100vw;
  height: 100vh;
  opacity: 0.1;
  transition: opacity 0.3s;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${p => {
    switch (p.state) {
      case 'entering':
        return 'opacity: 0.1'
      case 'entered':
        return 'opacity: 1'
      case 'exiting':
        return 'opacity: 0'
      default:
        return
    }
  }};
`

const Icon = styled(props => (
  <img {...props} src={getRandomElement(icons)} alt="" />
))`
  display: inline-block;
  height: 80px;
  width: 80px;
  vertical-align: top;
`

const Message = styled(props => (
  <span {...props}>{getRandomElement(messages)}</span>
))`
  display: inline-block;
  font-size: 72px;
  font-weight: 300;
  color: #fff;
`

const MessageContainer = styled.div`
  background: rgba(255, 255, 255, 0.4);
  width: 100vw;
  text-align: center;
  padding: 24px 0;
  transition: transform 0.3s, opacity 0.3s;

  ${p => {
    switch (p.state) {
      case 'entering':
        return 'transform: scale(2); opacity: 0.1;'
      case 'entered':
        return 'transform: scale(1); opacity: 1;'
      default:
        return
    }
  }};
`

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function WinMessage(props) {
  return (
    <Transition in={props.visible} timeout={600}>
      {state =>
        state === 'exited' ? null : (
          <Background state={state}>
            <MessageContainer state={state}>
              <Icon /> <Message />
            </MessageContainer>
          </Background>
        )
      }
    </Transition>
  )
}

export default WinMessage
