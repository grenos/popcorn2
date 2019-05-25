import React, { useState } from 'react'
import { connect } from 'react-redux'
import { getUserInputRequest } from '../../redux/actions/apiActions'
import * as INT from '../../helpers/interfaces'
import UI from './UI'


type InputVal = React.FormEvent<HTMLInputElement>

export const UnconnectedSearchInput: React.FC<INT.IInputProps> = ({ scrolled, getUserInputRequest }): JSX.Element => {

  const [change, setChange] = useState<string>('')

  const handleChange = (e: InputVal): void => {
    setChange(e.currentTarget.value)
  }

  const handleKeyUp = (): void => {
    getUserInputRequest(change)
  }

  return (
    <UI
      scrolled={scrolled}
      handleChange={handleChange}
      handleKeyUp={handleKeyUp}
      change={change}
      setChange={setChange}
    />
  )
}


export default connect(null, { getUserInputRequest })(UnconnectedSearchInput);
