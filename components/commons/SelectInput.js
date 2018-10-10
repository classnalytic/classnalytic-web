import FormItem from 'antd/lib/form/FormItem'
import Select from 'antd/lib/select'
const Option = Select.Option

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
}

export default ({ placeholder, name, label, value, size, onChange, onBlur, error, message, style, options = [] }) => (
  <FormItem {...formItemLayout} label={label} validateStatus={error ? 'error' : 'success'} help={error && message} hasFeedback={error}>
    <Select
      id={name}
      size={size}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={(value) => onChange(name, value)}
      onBlur={onBlur}
      style={style}
    >
      {options.map(option => (
        <Option key={option.id} value={option.id}>{option.value}</Option>
      ))}
    </Select>
  </FormItem>
)
