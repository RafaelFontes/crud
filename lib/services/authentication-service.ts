
import {Injectable} from "@angular/core";
import {StorageService} from "./storage-service";

export enum AuthenticationState
{
    UNDEFINED,
    AUTHENTICATING,
    AUTHENTICATED,
    UNAUTHORIZED
}

export enum AuthenticationErrorCode
{
    INVALID_USERNAME,
    INVALID_CREDENTIALS,
    INVALID_PASSWORD
}

@Injectable()
export class AuthenticationService
{
    private username:string = null;

    private state:AuthenticationState

    constructor(private storageService:StorageService)
    {
        console.debug("AuthenticationService.constructor");

        if ( this.storageService.get("username") )
        {
            this.state = AuthenticationState.AUTHENTICATED;
        }
        else
        {
            this.state = AuthenticationState.UNDEFINED;
        }
    }

    get authState () : AuthenticationState
    {
        return this.state;
    }

    authenticate( username : string , password : string ) : Promise<AuthenticationState>
    {
        return new Promise<AuthenticationState>( (resolve, reject) => {

            if ( password == '123' )
            {
                this.storageService.insert("username", username);

                this.username = username;

                this.state = AuthenticationState.AUTHENTICATED;

                resolve(this.state);
            }
            else
            {
                reject( new Error("AuthenticationErrorCode.INVALID_CREDENTIALS"))
            }

        });
    }

    logout()
    {
        this.username = null;
        this.state = AuthenticationState.UNDEFINED;
        this.storageService.destroy("username");
    }
}