import { Route, RouteComponentProps } from "react-router";

export interface NavigationLinkProps extends RouteComponentProps<any>{
  route: string;
  children: any;
}

export interface PageProps {
  title: string;
  description: string;
  baseRoute: string;
  routes: Route[];
  navigationLinks: any[];
  bgImage?: string;
}

export interface NavigationHistoryProps extends RouteComponentProps<any> {
  name: string;
  route: string;
  icon?: string;
}

export interface NavigationHeaderProps {
  name: string;
}

export interface DropDownItemProps {
  text: string;
  onClick?: Function;
  className?: string;
  icon?: string;
  to?: string;
  refresh?: string;
  newtab?: string;
  href?: string;
  'data-uk-toggle'?: string;
}

export interface DropDownProps{
  text: string;
  children?: any;
  className?: any;
  type?: any;
}

export interface FormProps{
  onSubmit?: Function;
  children: any;
}

export declare type InputPropsChangeHandler = (change: any) => void;

export interface InputProps{
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: InputPropsChangeHandler;
  divClass?: string;
  autoFocus?: boolean;
  textarea?: boolean;
}

export interface ButtonProps {
  text: string;
  onClick?: Function;
  type?: string;
  show?: boolean;
  className?: string;
  icon?: string;
  uktoggle?: string;
}

export interface SectionProps{
  bgImage?: string;
  title: string;
  description: string;
}

export interface SearchResultProps{
  results: any[];
  onClick: Function;
  active: number;
}

export interface AreYourSureModalProps {
  text: string;
  yesClicked: Function;
  id: string;
  children: any;
}

export interface ModalProps {
  children: any;
  buttons: any[];
  id: string;
  title: string;
}

export interface FormFieldProps {
  edit: boolean;
  title?: string;
  data: any;
  onChange: Function;
  label?: boolean;
  focus?: boolean;
  onEnter?: Function;
  type?: string;
}

export interface EditCancelButtonProps {
  edit: boolean;
  onSave: Function;
  onCancel: Function;
}

export interface FieldSetProps {
  title: string;
  children: any;
}

export interface SelectProps {
  onChange: Function;
  value: any;
  options: OptionProps[];
}

export interface OptionProps {
  value: any;
  title: any;
}