// Model per la History Page

export class CultureItems {
    categoria? : string
    denominazione?: string
    definizione?: string
    autore? : string
    epoca?: string
    provincia?: string
    siglaprovincia?: string
    comune?: string
    indirizzo?: string
    cap?: string             // verificare se è un numero o una stringa
    materia?: string          //vedere se mantenerlo
    abstract?: string         // capire la differenza con la descrizione
    descrizione?: string       // non è sempre presente
    dataCompilazione?: string
    tipologia?: string
    notiziestoriche?: string | undefined 
    
}
