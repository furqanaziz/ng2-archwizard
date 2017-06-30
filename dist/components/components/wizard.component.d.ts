import { AfterContentInit, QueryList } from '@angular/core';
import { WizardStepComponent } from './wizard-step.component';
import { MovingDirection } from '../util/MovingDirection';
import { WizardCompletionStepComponent } from './wizard-completion-step.component';
import { WizardStep } from '../util/WizardStep';
/**
 * The `wizard` component defines the root component of a wizard.
 * Through the setting of input parameters for the `wizard` component it's possible to change the location and size
 * of its navigation bar.
 *
 * ### Syntax
 * ```html
 * <wizard [navBarLocation]="location of navigation bar" [navBarLayout]="layout of navigation bar">
 *     ...
 * </wizard>
 * ```
 *
 * ### Example
 *
 * Without completion step:
 *
 * ```html
 * <wizard navBarLocation="top" navBarLayout="small">
 *     <wizard-step>...</wizard-step>
 *     <wizard-step>...</wizard-step>
 * </wizard>
 * ```
 *
 * With completion step:
 *
 * ```html
 * <wizard navBarLocation="top" navBarLayout="small">
 *     <wizard-step>...</wizard-step>
 *     <wizard-step>...</wizard-step>
 *     <wizard-completion-step>...</wizard-completion-step>
 * </wizard>
 * ```
 *
 * @author Marc Arndt
 */
export declare class WizardComponent implements AfterContentInit {
    /**
     * A QueryList containing all WizardSteps in this Wizard
     */
    wizardSteps: QueryList<WizardStepComponent>;
    /**
     * An optional step, which is always the last step in the wizard and should be entered
     * when the wizard has been successfully completed
     */
    completionStep: WizardCompletionStepComponent;
    /**
     * Returns a list containing all steps inside this [[WizardComponent]].
     * This list contains both the normal [[WizardStepComponent]] inside `wizardSteps` and the optional [[WizardCompletionStepComponent]]
     * inside `completionStep`
     *
     * @returns {Array<WizardStep>} A list containing all steps inside this wizard
     */
    readonly allSteps: Array<WizardStep>;
    /**
     * The location of the navigation bar inside the wizard.
     * This location can be either top, bottom, left or right
     *
     * @type {string}
     */
    navBarLocation: string;
    /**
     * The layout of the navigation bar inside the wizard.
     * The layout can be either small, large-filled, large-empty or large-symbols
     *
     * @type {string}
     */
    navBarLayout: string;
    /**
     * Returns true if this wizard uses a horizontal orientation.
     * The wizard uses a horizontal orientation, iff the navigation bar is shown at the top or bottom of this wizard
     *
     * @returns {boolean} True if this wizard uses a horizontal orientation
     */
    readonly horizontalOrientation: boolean;
    /**
     * Returns true if this wizard uses a vertical orientation.
     * The wizard uses a vertical orientation, iff the navigation bar is shown at the left or right of this wizard
     *
     * @returns {boolean} True if this wizard uses a vertical orientation
     */
    readonly verticalOrientation: boolean;
    /**
     * The index of the currently visible and selected step inside the wizardSteps QueryList.
     * If this wizard contains no steps, currentStepIndex is -1
     */
    currentStepIndex: number;
    /**
     * The WizardStep object belonging to the currently visible and selected step.
     * The currentStep is always the currently selected wizard step.
     * The currentStep can be either completed, if it was visited earlier,
     * or not completed, if it is visited for the first time or its state is currently out of date.
     *
     * If this wizard contains no steps, currentStep is null
     */
    currentStep: WizardStep;
    /**
     * If this wizard has been completed, `completed` will be true
     */
    completed: boolean;
    /**
     * Constructor
     */
    constructor();
    /**
     * Initialization work
     */
    ngAfterContentInit(): void;
    /**
     * Checks if a given index `stepIndex` is inside the range of possible wizard steps inside this wizard
     *
     * @param stepIndex The to be checked index of a step inside this wizard
     * @returns {boolean} True if the given `stepIndex` is contained inside this wizard, false otherwise
     */
    hasStep(stepIndex: number): boolean;
    /**
     * Checks if this wizard has a previous step, compared to the current step
     *
     * @returns {boolean} True if this wizard has a previous step before the current step
     */
    hasPreviousStep(): boolean;
    /**
     * Checks if this wizard has a next step, compared to the current step
     *
     * @returns {boolean} True if this wizard has a next step after the current step
     */
    hasNextStep(): boolean;
    /**
     * Checks if this wizard is currently inside its last step
     *
     * @returns {boolean} True if the wizard is currently inside its last step
     */
    isLastStep(): boolean;
    /**
     * Finds the [[WizardStep]] at the given index `stepIndex`.
     * If no [[WizardStep]] exists at the given index an Error is thrown
     *
     * @param stepIndex The given index
     * @returns {undefined|WizardStep} The found [[WizardStep]] at the given index `stepIndex`
     * @throws An `Error` is thrown, if the given index `stepIndex` doesn't exist
     */
    getStepAtIndex(stepIndex: number): WizardStep;
    /**
     * Find the index of the given [[WizardStep]] `step`.
     * If the given [[WizardStep]] is not contained inside this wizard, `-1` is returned
     *
     * @param step The given [[WizardStep]]
     * @returns {number} The found index of `step` or `-1` if the step is not included in the wizard
     */
    getIndexOfStep(step: WizardStep): number;
    /**
     * Calculates the correct [[MovingDirection]] value for a given `destinationStep` compared to the `currentStepIndex`.
     *
     * @param destinationStep The given destination step
     * @returns {MovingDirection} The calculated [[MovingDirection]]
     */
    getMovingDirection(destinationStep: number): MovingDirection;
    /**
     * Tries to transition the wizard to the previous step from the `currentStep`
     */
    goToPreviousStep(): void;
    /**
     * Tries to transition the wizard to the next step from the `currentStep`
     */
    goToNextStep(): void;
    /**
     * Checks if it's possible to transition to the previous step from the `currentStep`
     *
     * @returns {boolean} True if it's possible to transition to the previous step, false otherwise
     */
    canGoToPreviousStep(): boolean;
    /**
     * Checks if it's possible to transition to the next step from the `currentStep`
     *
     * @returns {boolean} True if it's possible to transition to the next step, false otherwise
     */
    canGoToNextStep(): boolean;
    /**
     * Checks if it's possible to transition to the step with the given `stepIndex` from the `currentStep`.
     *
     * @param stepIndex The to be checked step index
     * @returns {boolean} True if it's possible to transition to the given `stepIndex`
     */
    canGoToStep(stepIndex: number): boolean;
    /**
     * Tries to transition to the given `destinationStepIndex`.
     * This will only fail, if the `currentStep` can't be left
     *
     * @param destinationStepIndex The index of the destination step
     */
    goToStep(destinationStepIndex: number): void;
    /**
     * Resets the state of this wizard.
     * A reset transitions the wizard automatically to the first step and sets all steps as incomplete.
     * In addition the whole wizard is set as incomplete
     */
    reset(): void;
    /**
     * This method returns true, if the given step `wizardStep` can be exited and false otherwise.
     * Because this method depends on the value `canExit`, it will throw an error, if `canExit` is neither a boolean
     * nor a function.
     *
     * @param wizardStep The [[WizardStep]] to be checked
     * @param direction The direction in which this step should be left
     * @returns {any} True if the given step `wizardStep` can be exited in the given direction, false otherwise
     * @throws An `Error` is thrown if `wizardStep.canExit` is neither a function nor a boolean
     */
    canExitStep(wizardStep: WizardStep, direction: MovingDirection): boolean;
}
