export interface IBoard {
  id: string;
  name: string;
  purpose: string;
  background: string | undefined;
}

export interface ITemplatesColumn {
  id: string;
  title: string;
  tasks: Array<string>;
}

export interface IBoardTemplates extends IBoard {
  columns: ITemplatesColumn[];
}
