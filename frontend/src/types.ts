export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  isFavourite: boolean;
}
export interface RecipeSummary{
  id: number;
  title: string;
  summary:string;
}