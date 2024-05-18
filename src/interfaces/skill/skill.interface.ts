export interface ISkill {
    id: string;
    title: string;
    icons: {
      class: string;
      color: string;
      title: string;
      isHTML: boolean;
      innerHTML?: string;
    }[];
    mainIconClass: string;
  };