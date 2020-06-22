import React from 'react'
import classes from './Backdrop.css'

const backdrop = props => (
    props.showBackdrop ? <div className={classes.Backdrop} onClick={props.closed}></div> : null
)

export default backdrop