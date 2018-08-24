import FormItem from 'antd/lib/form/FormItem';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';

export default ({ placeholder, icon, name, value, type, onChange, onBlur, error, message }) => (
  <FormItem validateStatus={error ? 'error' : 'success'} help={error && message} hasFeedback={error}>
    <Input
      id={name}
      type={type}
      size="large"
      name={name}
      value={value}
      prefix={<Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} />}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
    />
  </FormItem>
);
