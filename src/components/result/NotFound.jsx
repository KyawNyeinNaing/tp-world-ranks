import styled from 'styled-components'
import { Text } from '../core'
import { colors } from '../constant'

const NotFound = props => {
  return (
    <NoResult>
      {/* <img src={NotResultFoundImage} alt="not found" /> */}
      <Text cu_size="16">{props.result}</Text>
    </NoResult>
  )
}

export default NotFound

const NoResult = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  border-radius: 10px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: var(--background-color-dark);
  border-radius: var(--radius);
  > {
    * {
      color: var(--text-color-secondary);
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  img {
    width: 150px;
    height: 150px;
  }
`