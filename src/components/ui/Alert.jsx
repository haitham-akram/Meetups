import classes from './Alert.module.css'
function Alert(props) {
  const { message, onClose } = props

  return (
    <div className={classes.parent}>
      <div className={classes.alert}>
        <button onClick={onClose} className={classes.closeButton}>
          X
        </button>
        <h4>{message}</h4>
      </div>
    </div>
  )
}
export default Alert
