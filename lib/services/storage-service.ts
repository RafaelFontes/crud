
import {Injectable} from "@angular/core";

@Injectable()
export class StorageService
{
    constructor()
    {
        console.debug("StorageService.constructor");
    }

    insert<T>( key:string, value:T )
    {
        localStorage.setItem( key, JSON.stringify(value) );
    }

    get<T>( key : string ) : T
    {
        return <T>JSON.parse(localStorage.getItem( key ));
    }

    destroy( key: string )
    {
        localStorage.removeItem(key);
    }
}