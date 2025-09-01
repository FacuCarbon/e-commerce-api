export interface Category {
  id: number;
  name: string;
  parentId: number | null;
  parent?: Category | null;
  children?: Category[];
}
