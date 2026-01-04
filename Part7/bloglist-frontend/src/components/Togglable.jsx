import { useState, useImperativeHandle } from 'react'
import { Button } from '@mui/material'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        {/* <button onClick={toggleVisibility}>{props.buttonLabel}</button> */}
        <Button
          variant="contained"
          color="primary"
          onClick={toggleVisibility}
          size="small"
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        {/* <button onClick={toggleVisibility}>cancel</button> */}
        <Button
          variant="contained"
          color="error"
          onClick={toggleVisibility}
          size="small"
        >
          cancel
        </Button>
      </div>
    </div>
  )
}

export default Togglable
