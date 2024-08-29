export interface Menu{
  id:number;
  nom: string;
  plat: string;
  entree: string;
  description: string;
  prix: number;
  disponibilite: boolean;
  evaluation: number;
  image: string;
  serverEvaluation?: number;
  quantity?: number;
}
