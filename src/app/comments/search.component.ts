import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
    transform(value: any, input: string) {
        if (!value) return null;
        if (!input) return value;
        return value.filter((val: any) =>
            val.name.toLowerCase().includes(input.toLowerCase()));
    }
}