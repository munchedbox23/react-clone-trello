export interface ITemplatesColumn {
  id: string;
  title: string;
  tasks: Array<string>;
}

export interface IBoard {
  _id: string;
  type: "template" | "board";
  name: string;
  background: string;
  columns: ITemplatesColumn[];
  user: string;
}
