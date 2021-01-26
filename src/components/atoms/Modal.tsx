import React from 'react'

const ModalWindow = (props: any) => {
  const { isOpen, handleClose } = props

  const stopPropagation = (event: any) => event.stopPropagation()
  return (
    isOpen && (
    <div className="modal" onClick={handleClose}>
      <div className="modal__window" onClick={stopPropagation}>
        {props.children}
      </div>
    </div>
    )
  )
}

export default ModalWindow
