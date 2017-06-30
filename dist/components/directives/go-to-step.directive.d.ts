/**
 * Created by marc on 09.01.17.
 */
import { EventEmitter } from '@angular/core';
import { WizardComponent } from '../components/wizard.component';
import { WizardStepComponent } from '../components/wizard-step.component';
/**
 * The `goToStep` directive can be used to navigate to a given step.
 * This step can be defined in one of multiple formats
 *
 * ### Syntax
 *
 * With absolute step index:
 *
 * ```html
 * <button [goToStep]="absolute step index" (finalize)="finalize method">...</button>
 * ```
 *
 * With a wizard step object:
 *
 * ```html
 * <button [goToStep]="wizard step object" (finalize)="finalize method">...</button>
 * ```
 *
 * With an offset to the defining step
 *
 * ```html
 * <button [goToStep]="{ stepOffset: offset }" (finalize)="finalize method">...</button>
 * ```
 *
 * @author Marc Arndt
 */
export declare class GoToStepDirective {
    private wizard;
    private wizardStep;
    /**
     * An EventEmitter to be called when this directive is used to exit the current step.
     * This EventEmitter can be used to do cleanup work
     *
     * @type {EventEmitter}
     */
    finalize: EventEmitter<{}>;
    /**
     * The destination step, to which the wizard should navigate, after the component, having this directive has been activated.
     * This destination step can be given either as a [[WizardStep]] containing the step directly,
     * a [[StepOffset]] between the current step and the `wizardStep`, in which this directive has been used,
     * or a step index as a number or string
     */
    private goToStep;
    /**
     * Constructor
     *
     * @param wizard The wizard, which contains this [[GoToStepDirective]]
     * @param wizardStep The wizard step, which contains this [[GoToStepDirective]]
     */
    constructor(wizard: WizardComponent, wizardStep: WizardStepComponent);
    /**
     * Returns the destination step of this directive as an absolute step index inside the wizard
     *
     * @returns {number} The index of the destination step
     * @throws If `goToStep` is of an unknown type an `Error` is thrown
     */
    readonly destinationStep: number;
    /**
     * Listener method for `click` events on the component with this directive.
     * After this method is called the wizard will try to transition to the `destinationStep`
     */
    onClick(): void;
    goToClosestValidStep(min: any, max: any, asc: any): void;
}
