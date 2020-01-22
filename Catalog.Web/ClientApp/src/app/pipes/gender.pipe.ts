import { Pipe, PipeTransform } from '@angular/core';
import { config } from '../app.config';

class Gender {
    constructor(public lang: string, public genders: string[]) {

    }
}
const lookup: Gender[] = [
    { lang: "en", genders: ["Male", "Female"] },
    { lang: "fr", genders: ["Femelle", "Femme"] },
];

@Pipe({ name: 'gender' })
export class GenderPipe implements PipeTransform {
    transform(value: number, lang: string): string {
        let res: string = String(value);
        if (lang == null)
            lang = config.lang;
        if (value == 0 || value == 1) {
            let x = lookup.filter(x => x.lang == lang);
            if (x.length == 1) {
                res = x[0].genders[value];
            }
        }

        return res;
    }
}
