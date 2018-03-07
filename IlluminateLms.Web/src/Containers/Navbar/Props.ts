export interface DropdownItemProps {
  type: string;
  title: string;
  route?: string;
  icon?: string;
  action?: Function;
}

export interface DropdownProps {
  items: DropdownItemProps[];
}