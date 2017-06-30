import { EventEmitter } from '@angular/core';
import { WizardComponent } from '../components/wizard.component';
/**
 * The `nextStep` directive can be used to navigate to the next step.
 *
 * ### Syntax
 *
 * ```html
 * <button nextStep (finalize)="finalize method">...</button>
 * ```
 *
 * @author Marc Arndt
 */
export declare class NextStepDirective {
    private wizard;
    /**
     * An EventEmitter to be called when this directive is used to exit the current step.
     * This EventEmitter can be used to do cleanup work
     *
     * @type {EventEmitter}
     */
    finalize: EventEmitter<{}>;
    /**
     * Constructor
     *
     * @param wizard The [[WizardComponent]], this directive is used inside
     */
    constructor(wizard: WizardComponent);
    /**
     * Listener method for `click` events on the component with this directive.
     * After this method is called the wizard will try to transition to the next step
     */
    onClick(): void;
}
