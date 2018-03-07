import { User, Role } from "../../../../Models";

export interface SelectedPersonContainerState{
  editNames: boolean;
  user: User;
  roles: Role[]
}