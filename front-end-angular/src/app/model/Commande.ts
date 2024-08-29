import {CommandeDetails} from "./CommandeDetails";
import {ArticleDeCommande} from "./ArticleDeCommande";
import {Personnel} from "./Personnel";

export interface Commande {
    commandeDetailDto: CommandeDetails;
    personnelDto: Personnel;
    articleDeCommandeDtos: ArticleDeCommande[];
}
