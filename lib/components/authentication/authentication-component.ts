import {Component, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef} from "@angular/core";
import {AuthenticationService, AuthenticationState} from "../../services/authentication-service";
import TweenLite = require('gsap');

declare var __moduleName:any;
declare class Expo { static easeOut:any; static easeIn:any; };

export enum AuthenticationStep
{
    USERNAME,
    PASSWORD,
    AUTHENTICATING
}

@Component({
    moduleId: __moduleName,
    selector: 'authentication',
    templateUrl: 'authentication.html',
    styleUrls:  ['authentication.css'],
    providers: []
})
export class AuthenticationComponent implements AfterViewInit
{

    @ViewChild("username") private username:ElementRef;
    @ViewChild("password") private password:ElementRef;

    private usernameFieldValue:string = "";
    private passwordFieldValue:string = "";

    readonly USERNAME_STEP:AuthenticationStep = AuthenticationStep.USERNAME;
    readonly PASSWORD_STEP:AuthenticationStep = AuthenticationStep.PASSWORD;
    readonly AUTHENTICATING_STEP:AuthenticationStep = AuthenticationStep.AUTHENTICATING;

    @Output("stateChange") stateChange:EventEmitter<AuthenticationState> = new EventEmitter<AuthenticationState>();
    private errorMessage:string = null;
    private step:AuthenticationStep = AuthenticationStep.USERNAME;

    constructor( private authenticationService: AuthenticationService )
    {
        console.debug("AuthenticationComponent.constructor");
    }

    //noinspection JSMethodCanBeStatic
    ngAfterViewInit(): void {
        TweenLite.to( document.getElementById("username"), 0.1,
            { 'margin-left': 0,ease: Expo.easeOut }
        );
    }

    authenticate()
    {
        this.stateChange.emit( AuthenticationState.AUTHENTICATING );

        this.authenticationService.authenticate( this.usernameFieldValue, this.passwordFieldValue).then(
            state => {
                this.stateChange.emit(state);
                this.errorMessage = null;
            }
        ).catch( ex => {
            this.errorMessage = ex.message;
            this.stateChange.emit( AuthenticationState.UNAUTHORIZED );
        });
    }

    get currentStep () : AuthenticationStep
    {
        return this.step;
    }

    nextStep() : void
    {

        if ( this.currentStep == AuthenticationStep.USERNAME && this.usernameFieldValue != "" )
        {
            this.step = AuthenticationStep.PASSWORD;

            TweenLite.to( this.username.nativeElement, 0.1,
                { 'margin-left': -500, ease: Expo.easeIn,
                    onComplete: () => {
                        TweenLite.to( this.password.nativeElement, 0.1,
                            { 'margin-left': 0,ease: Expo.easeOut,
                                onComplete : () =>{
                                    this.password.nativeElement.focus();
                                }
                            }
                        );

                    }
                }
            );

        }
        else
        {
            //@todo: submit
        }
    }

    prevStep() : void
    {
        if ( this.currentStep == AuthenticationStep.PASSWORD )
        {
            this.step = AuthenticationStep.USERNAME;

            TweenLite.to( this.password.nativeElement, 0.1,
                { 'margin-left': 500,ease: Expo.easeIn, onComplete: () => {

                    TweenLite.to( this.username.nativeElement, 0.1,
                        { 'margin-left': 0,ease: Expo.easeOut, onComplete: () =>{
                            this.username.nativeElement.focus();
                        } }
                    );

                } }
            );
        }
    }
}
