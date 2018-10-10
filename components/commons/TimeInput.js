import FormItem from 'antd/lib/form/FormItem'
import Icon from 'antd/lib/icon'
import TimePicker from 'antd/lib/time-picker'
import moment from 'moment'

export default ({ placeholder, icon, name, label, value, size, type, onChange, onBlur, error, message, style, format }) => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: label ? 6 : 0 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: label ? 18 : 24 }
    }
  }

  return (
    <FormItem {...formItemLayout} label={label} validateStatus={error ? 'error' : 'success'} help={error && message} hasFeedback={error}>
      <TimePicker
        id={name}
        type={type}
        size={size}
        name={name}
        defaultValue={moment(format)}
        value={moment(value)}
        prefix={<Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder={placeholder}
        format={format}
        onChange={(time) => {
          onChange(name, time)
        }}
        onBlur={onBlur}
        style={style}
      />
    </FormItem>
  )
}
