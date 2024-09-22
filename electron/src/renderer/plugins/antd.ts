import {
  Input,
  Form,
  Checkbox,
  Select,
  Button,
  Tag,
  InputNumber,
  Tooltip,
  Radio,
  Tabs,
  Layout,
  Menu,
  DatePicker
} from "ant-design-vue"
import type { App } from "vue"
export function setupAntd(app: App<Element>) {
  app
    .use(Form)
    .use(Input)
    .use(Checkbox)
    .use(Select)
    .use(Button)
    .use(Tag)
    .use(InputNumber)
    .use(Tooltip)
    .use(Radio)
    .use(Tabs)
    .use(Layout)
    .use(Menu)
    .use(DatePicker)
}
