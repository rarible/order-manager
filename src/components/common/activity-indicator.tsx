import styled, { keyframes } from "styled-components"

const spinAnimation = keyframes`
	0% {
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg);
	}
`

export const ActivityIndicator = styled.div`
  position: relative;
  margin: auto;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  animation: ${spinAnimation} 0.66s infinite linear;
  border-style: solid;
  border-color: ${p => p.theme.colors.line};
  border-left-color: ${p => p.theme.colors.primary};
  transform: translateZ(0);
  border-width: 3px;
  user-select: none;
`
