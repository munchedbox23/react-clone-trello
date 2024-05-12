export interface IBoardColumn {
  id: string;
  name: string;
  purpose: string;
  background: undefined;
}

export interface ITemplatesColumn {
  id: string;
  title: string;
  tasks: Array<string>;
}

export interface IBoardTemplates
  extends Pick<IBoardColumn, "id" | "name" | "purpose"> {
  background: string;
  columns: ITemplatesColumn[];
}
