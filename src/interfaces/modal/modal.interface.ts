export interface IModal {
    title: string;
    description: string;
    image: string;
    tags?: string[];
    buttons?: {
      title: string;
      color?: string;
      url: string;
    }[];
    enabled: boolean;
  };