import React from 'react'
import styled from 'styled-components'
import Transition from 'react-transition-group/Transition'

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: #c0392b;
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

const Title = styled.div`
  font-size: 40px;
  font-weight: 300;
  color: #fff;
  margin-bottom: 32px;
`

const Cards = styled.div`
  display: flex;
  & > * {
    margin: 0 16px;

    @media only screen and (max-device-width: 640px) {
      margin: 0 8px;
    }
  }
`

const Card = styled.div`
  width: calc(170px * 2);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 6px;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding: 16px 0;
  border-bottom: 2px solid orange;

  @media only screen and (max-device-width: 640px) {
    width: 170px;
  }
`

const Img = styled.img`
  width: 170px;
  height: 170px;
  border-radius: 50%;
  border: 8px solid #ecf0f1;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
  margin: 16px 0;

  @media only screen and (max-device-width: 640px) {
    width: 85px;
    height: 85px;
  }
`

const Name = styled.div`
  font-size: 24px;
  text-align: center;
`

const Button = styled.button.attrs({ type: 'button' })`
  margin: 16px 0;
  font-size: 24px;
  padding: 10px 20px;
  border: none;
  box-shadow: 0 2px #2980b9;
  transform: translateY(0);
  border-radius: 6px;
  background: #3498db;
  color: #fff;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;

  &:active {
    outline: none;
    box-shadow: 0 0 #2980b9;
    transform: translateY(2px);
  }

  &:focus {
    outline: none;
  }
`

function ErrorMessage(props) {
  return (
    <Transition in={props.visible} timeout={600}>
      {state =>
        state === 'exited' || state === 'exiting' ? null : (
          <Background state={state}>
            <Title>Sorry!</Title>
            <Cards>
              <Card>
                <Img src={props.correct.photo} />
                <Name>{props.correct.name}</Name>
              </Card>
              <Card>
                <Img src={props.wrong.photo} />
                <Name>{props.wrong.name}</Name>
              </Card>
            </Cards>
            <Button onClick={props.onPlayAgain}>Play again</Button>
          </Background>
        )
      }
    </Transition>
  )
}

export default ErrorMessage
