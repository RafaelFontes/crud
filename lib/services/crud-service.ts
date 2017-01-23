import * as users from "../../mock/users.json";

let services:any = { "users" : users.data };

interface CRUDItem
{
    id?:string;
}

export class CrudService
{
    constructor(private service:string)
    {
        console.debug("CrudService.constructor");
    }

    save( data: CRUDItem ) : Promise<any>
    {
        return new Promise<any>( (resolve, reject) => {

            if ( services[this.service] )
            {
                let index = -1;

                if ( data.id )
                {
                    services[this.service].forEach(
                        (item:CRUDItem, i:number) => {
                        if ( data.id == item.id )
                        {
                            index = i;
                            services[this.service].splice( index, 1, data );
                            return item;
                        }
                    });
                }
                else
                {
                    data.id = services[this.service].length + 1;

                    services[this.service].push( data );
                    index = Number(data.id) - 1;
                }

                if ( index != -1 )
                {
                    resolve( services[this.service][index] );
                }
                else
                {
                    reject(new Error("id not found"))
                }
            }
            else
            {
                reject(new Error("service not found"));
            }
        });
    }

    load(id:string) : Promise<void>
    {
        return new Promise<void>( (resolve, reject) => {


            resolve();

        });
    }

    remove(id:string) : Promise<void>
    {
        return new Promise<void>( (resolve, reject) => {

            if ( services[this.service] )
            {
                if ( services[this.service].length > 0 )
                {
                    services[this.service].forEach( (item:CRUDItem, index:number) => {
                        if ( item.id == id )
                        {
                            services[this.service].splice(index, 1);
                            return;
                        }
                    });

                    resolve();
                }
                else
                {
                    resolve();
                }
            }
            else
            {
                reject(new Error("service not found"));

            }


        });
    }

    search(criteria:string) : Promise<void>
    {
        return new Promise<void>( (resolve, reject) => {



        });
    }

    getLast() : Promise<CRUDItem>
    {
        return new Promise<CRUDItem>( (resolve,reject) => {

            if ( services[this.service] )
            {
                if ( services[this.service].length > 0 )
                {
                    resolve( services[this.service][ services[this.service].length - 1 ] );
                }
                else
                {
                    resolve( {} );
                }
            }
            else
            {
                reject(new Error("service not found"));

            }

        });
    }
};