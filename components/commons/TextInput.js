import FormItem from 'antd/lib/form/FormItem';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';

export default ({ placeholder, icon, type }) => (
  <FormItem>
    <Input type={type} prefix={<Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={placeholder} />
  </FormItem>
);
