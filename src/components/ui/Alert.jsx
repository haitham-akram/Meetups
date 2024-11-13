import classes from './Alert.module.css'
function Alert(props) {
  const message = props.message
  return (
    <div className={classes.parent}>
      <div className={classes.alert}>
        <h4>{message}</h4>
      </div>
    </div>
  )
}
export default Alert
