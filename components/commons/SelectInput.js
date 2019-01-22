import React from 'react'
import PropTypes from 'prop-types'
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

const SelectInput = ({
  placeholder,
  name,
  label,
  value,
  size,
  onChange,
  onBlur,
  error,
  message,
  style,
  options = [],
  defaultValue
}) => (
  <FormItem
    {...formItemLayout}
    label={label}
    validateStatus={error ? 'error' : 'success'}
    help={error && message}
    hasFeedback={error}
  >
    <Select
      id={name}
      size={size}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={value => onChange(name, value)}
      onBlur={onBlur}
      style={style}
      defaultValue={defaultValue}
    >
      {options.map(option => (
        <Option key={option.id} value={option.id}>
          {option.value}
        </Option>
      ))}
    </Select>
  </FormItem>
)

SelectInput.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  size: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  message: PropTypes.string,
  style: PropTypes.object,
  options: PropTypes.array,
  defaultValue: PropTypes.string
}

export default SelectInput
