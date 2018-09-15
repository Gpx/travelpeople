import React from 'react'
import styled from 'styled-components'
import star from './star.png'

const Star = styled.img.attrs({ src: star })`
  height: 30px;
  width: 30px;
`

const PointsText = styled.div`
  text-align: center;
  font-size: 40px;
  margin: 8px 0;
  color: #fff;
`

function Points(props) {
  return (
    <PointsText>
      <Star /> &times;
      {props.round}
    </PointsText>
  )
}

export default Points
