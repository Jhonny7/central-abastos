import { Injectable } from '@angular/core';

/**
 * Service to format strings
 */
@Injectable()
export class StringUtilsService {

    /**
     * Joins a string with underscores
     * @param str string to format
     */
    public joinUnderscore(str: string): any {
        let val: string = str.split(' ').join('_');
        val = val.replace(/_{2,}/g, '_');

        return this.removeAccents(val);
    }

    /**
     * Joins a string with scores
     * @param str string to format
     */
    public joinMiddleScores(str: string): any {
        let val: string = str.split(' ').join('-');
        val = val.replace(/-{2,}/g, '-');

        return this.removeAccents(val);
    }

    /**
     * Capitalize first letter in s astring
     * @param str string to format
     */
    public capitilize(str: string): any {

        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Capitalize first letter in s astring
     * @param str string to format
     */
    public capitilizeFormat(str: string): any {
        let chequeo: any = str.split("_");
        if (chequeo.length > 1) {
            return chequeo[1].charAt(0).toUpperCase() + chequeo[1].slice(1);
        } else {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

    }

    /**Separa Palabras snake_case */
    snakeCaseFormat(str: string) {
        let separados = str.split("_");
        let retorno: string = "";
        separados.forEach(itemSnake => {
            retorno += `${itemSnake} `;
        });
        return retorno;
    }

    /**
     * Removes accents
     * @param str string to format
     */
    public removeAccents(str: any) {
        let strAccents: any = "";
        if (str) {
            strAccents = str.split('');
            let strAccentsOut: any = new Array();
            let strAccentsLen = strAccents.length;
            let accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
            let accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
            for (let y = 0; y < strAccentsLen; y++) {
                if (accents.indexOf(strAccents[y]) != -1) {
                    strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
                } else {
                    strAccentsOut[y] = strAccents[y];
                }
            }
            strAccentsOut = strAccentsOut.join('');
            return strAccentsOut;
        } else {
            return strAccents;
        }

    }

    /**
     * Removes special characters
     * @param str string to be formatted
     */
    public removeSpecialCharacters(str: string) {
        return str.replace(/[^\w\s]/gi, '');
    }

}