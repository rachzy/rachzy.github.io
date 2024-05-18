export interface IDownloadOption {
  id: string;
  label: string;
  subOptions?: IDownloadOption[];
  downloadFile?: string;
}
