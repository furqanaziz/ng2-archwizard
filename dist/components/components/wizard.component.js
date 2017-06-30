import { Component, ContentChild, ContentChildren, forwardRef, HostBinding, Input } from '@angular/core';
import { WizardStepComponent } from './wizard-step.component';
import { MovingDirection } from '../util/MovingDirection';
import { WizardCompletionStepComponent } from './wizard-completion-step.component';
import { isBoolean } from 'util';
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
var WizardComponent = (function () {
    /**
     * Constructor
     */
    function WizardComponent() {
        /**
         * The location of the navigation bar inside the wizard.
         * This location can be either top, bottom, left or right
         *
         * @type {string}
         */
        this.navBarLocation = 'top';
        /**
         * The layout of the navigation bar inside the wizard.
         * The layout can be either small, large-filled, large-empty or large-symbols
         *
         * @type {string}
         */
        this.navBarLayout = 'small';
        /**
         * The index of the currently visible and selected step inside the wizardSteps QueryList.
         * If this wizard contains no steps, currentStepIndex is -1
         */
        this.currentStepIndex = -1;
    }
    Object.defineProperty(WizardComponent.prototype, "allSteps", {
        /**
         * Returns a list containing all steps inside this [[WizardComponent]].
         * This list contains both the normal [[WizardStepComponent]] inside `wizardSteps` and the optional [[WizardCompletionStepComponent]]
         * inside `completionStep`
         *
         * @returns {Array<WizardStep>} A list containing all steps inside this wizard
         */
        get: function () {
            var steps = this.wizardSteps.toArray();
            if (this.completionStep) {
                steps.push(this.completionStep);
            }
            return steps;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardComponent.prototype, "horizontalOrientation", {
        /**
         * Returns true if this wizard uses a horizontal orientation.
         * The wizard uses a horizontal orientation, iff the navigation bar is shown at the top or bottom of this wizard
         *
         * @returns {boolean} True if this wizard uses a horizontal orientation
         */
        get: function () {
            return this.navBarLocation === 'top' || this.navBarLocation === 'bottom';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardComponent.prototype, "verticalOrientation", {
        /**
         * Returns true if this wizard uses a vertical orientation.
         * The wizard uses a vertical orientation, iff the navigation bar is shown at the left or right of this wizard
         *
         * @returns {boolean} True if this wizard uses a vertical orientation
         */
        get: function () {
            return this.navBarLocation === 'left' || this.navBarLocation === 'right';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialization work
     */
    WizardComponent.prototype.ngAfterContentInit = function () {
        this.reset();
    };
    /**
     * Checks if a given index `stepIndex` is inside the range of possible wizard steps inside this wizard
     *
     * @param stepIndex The to be checked index of a step inside this wizard
     * @returns {boolean} True if the given `stepIndex` is contained inside this wizard, false otherwise
     */
    WizardComponent.prototype.hasStep = function (stepIndex) {
        return this.allSteps.length > 0 && 0 <= stepIndex && stepIndex < this.allSteps.length;
    };
    /**
     * Checks if this wizard has a previous step, compared to the current step
     *
     * @returns {boolean} True if this wizard has a previous step before the current step
     */
    WizardComponent.prototype.hasPreviousStep = function () {
        return this.hasStep(this.currentStepIndex - 1);
    };
    /**
     * Checks if this wizard has a next step, compared to the current step
     *
     * @returns {boolean} True if this wizard has a next step after the current step
     */
    WizardComponent.prototype.hasNextStep = function () {
        return this.hasStep(this.currentStepIndex + 1);
    };
    /**
     * Checks if this wizard is currently inside its last step
     *
     * @returns {boolean} True if the wizard is currently inside its last step
     */
    WizardComponent.prototype.isLastStep = function () {
        return this.allSteps.length > 0 && this.currentStepIndex === this.allSteps.length - 1;
    };
    /**
     * Finds the [[WizardStep]] at the given index `stepIndex`.
     * If no [[WizardStep]] exists at the given index an Error is thrown
     *
     * @param stepIndex The given index
     * @returns {undefined|WizardStep} The found [[WizardStep]] at the given index `stepIndex`
     * @throws An `Error` is thrown, if the given index `stepIndex` doesn't exist
     */
    WizardComponent.prototype.getStepAtIndex = function (stepIndex) {
        if (!this.hasStep(stepIndex)) {
            throw new Error("Expected a known step, but got stepIndex: " + stepIndex + ".");
        }
        return this.allSteps.find(function (item, index, array) { return index === stepIndex; });
    };
    /**
     * Find the index of the given [[WizardStep]] `step`.
     * If the given [[WizardStep]] is not contained inside this wizard, `-1` is returned
     *
     * @param step The given [[WizardStep]]
     * @returns {number} The found index of `step` or `-1` if the step is not included in the wizard
     */
    WizardComponent.prototype.getIndexOfStep = function (step) {
        var stepIndex = -1;
        this.allSteps.forEach(function (item, index, array) {
            if (item === step) {
                stepIndex = index;
            }
        });
        return stepIndex;
    };
    /**
     * Calculates the correct [[MovingDirection]] value for a given `destinationStep` compared to the `currentStepIndex`.
     *
     * @param destinationStep The given destination step
     * @returns {MovingDirection} The calculated [[MovingDirection]]
     */
    WizardComponent.prototype.getMovingDirection = function (destinationStep) {
        var movingDirection;
        if (destinationStep > this.currentStepIndex) {
            movingDirection = MovingDirection.Forwards;
        }
        else if (destinationStep < this.currentStepIndex) {
            movingDirection = MovingDirection.Backwards;
        }
        else {
            movingDirection = MovingDirection.Stay;
        }
        return movingDirection;
    };
    /**
     * Tries to transition the wizard to the previous step from the `currentStep`
     */
    WizardComponent.prototype.goToPreviousStep = function () {
        if (this.hasPreviousStep()) {
            this.goToStep(this.currentStepIndex - 1);
        }
    };
    /**
     * Tries to transition the wizard to the next step from the `currentStep`
     */
    WizardComponent.prototype.goToNextStep = function () {
        if (this.hasNextStep()) {
            this.goToStep(this.currentStepIndex + 1);
        }
    };
    /**
     * Checks if it's possible to transition to the previous step from the `currentStep`
     *
     * @returns {boolean} True if it's possible to transition to the previous step, false otherwise
     */
    WizardComponent.prototype.canGoToPreviousStep = function () {
        var previousStepIndex = this.currentStepIndex - 1;
        return this.hasStep(previousStepIndex) && this.canGoToStep(previousStepIndex);
    };
    /**
     * Checks if it's possible to transition to the next step from the `currentStep`
     *
     * @returns {boolean} True if it's possible to transition to the next step, false otherwise
     */
    WizardComponent.prototype.canGoToNextStep = function () {
        var nextStepIndex = this.currentStepIndex + 1;
        return this.hasStep(nextStepIndex) && this.canGoToStep(nextStepIndex);
    };
    /**
     * Checks if it's possible to transition to the step with the given `stepIndex` from the `currentStep`.
     *
     * @param stepIndex The to be checked step index
     * @returns {boolean} True if it's possible to transition to the given `stepIndex`
     */
    WizardComponent.prototype.canGoToStep = function (stepIndex) {
        var _this = this;
        var result = this.canExitStep(this.currentStep, this.getMovingDirection(stepIndex)) && this.hasStep(stepIndex);
        this.allSteps.forEach(function (wizardStep, index, array) {
            if (index < stepIndex && index !== _this.currentStepIndex) {
                // all steps before the next step, that aren't the current step, must be completed or optional
                result = result && (wizardStep.completed || wizardStep.optional);
            }
        });
        return result;
    };
    /**
     * Tries to transition to the given `destinationStepIndex`.
     * This will only fail, if the `currentStep` can't be left
     *
     * @param destinationStepIndex The index of the destination step
     */
    WizardComponent.prototype.goToStep = function (destinationStepIndex) {
        var _this = this;
        var destinationStep = this.getStepAtIndex(destinationStepIndex);
        // In which direction is a step transition done?
        var movingDirection = this.getMovingDirection(destinationStepIndex);
        if (this.canExitStep(this.currentStep, movingDirection)) {
            // is it possible to leave the current step in the given direction?
            this.allSteps.forEach(function (wizardStep, index, array) {
                if (index === _this.currentStepIndex) {
                    // finish processing old step
                    wizardStep.completed = true;
                }
                if (_this.currentStepIndex > destinationStepIndex && index > destinationStepIndex) {
                    // if the next step is before the current step set all steps in between to incomplete
                    wizardStep.completed = false;
                }
            });
            // leave current step
            this.currentStep.exit(movingDirection);
            this.currentStep.selected = false;
            // go to next step
            this.currentStepIndex = destinationStepIndex;
            this.currentStep = destinationStep;
            this.currentStep.enter(movingDirection);
            this.currentStep.selected = true;
        }
        else {
            // if the current step can't be left, reenter the current step
            this.currentStep.exit(MovingDirection.Stay);
            this.currentStep.enter(MovingDirection.Stay);
        }
    };
    /**
     * Resets the state of this wizard.
     * A reset transitions the wizard automatically to the first step and sets all steps as incomplete.
     * In addition the whole wizard is set as incomplete
     */
    WizardComponent.prototype.reset = function () {
        // reset the step internal state
        this.allSteps.forEach(function (step, index) {
            step.completed = false;
            step.selected = false;
        });
        // set the wizard to incomplete
        this.completed = false;
        // set the first step as the current step
        this.currentStepIndex = 0;
        this.currentStep = this.getStepAtIndex(0);
        this.currentStep.selected = true;
        this.currentStep.enter(MovingDirection.Forwards);
    };
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
    WizardComponent.prototype.canExitStep = function (wizardStep, direction) {
        if (isBoolean(wizardStep.canExit)) {
            return wizardStep.canExit;
        }
        else if (wizardStep.canExit instanceof Function) {
            return wizardStep.canExit(direction);
        }
        else {
            throw new Error("Input value '" + wizardStep.canExit + "' is neither a boolean nor a function");
        }
    };
    WizardComponent.decorators = [
        { type: Component, args: [{
                    selector: 'wizard',
                    template: "\n    <wizard-navigation-bar\n      *ngIf=\"navBarLocation == 'top' || navBarLocation == 'left'\"\n      [ngClass]=\"{\n        vertical: navBarLocation == 'left',\n        horizontal: navBarLocation == 'top',\n        small: navBarLayout == 'small',\n        'large-filled': navBarLayout == 'large-filled',\n        'large-filled-symbols': navBarLayout == 'large-filled-symbols',\n        'large-empty': navBarLayout == 'large-empty',\n        'large-empty-symbols': navBarLayout == 'large-empty-symbols'\n      }\">\n    </wizard-navigation-bar>\n\n    <div [ngClass]=\"{\n      'wizard-steps': true,\n      vertical: navBarLocation == 'left' || navBarLocation == 'right',\n      horizontal: navBarLocation == 'top' || navBarLocation == 'bottom'\n    }\">\n      <ng-content></ng-content>\n    </div>\n\n    <wizard-navigation-bar\n      *ngIf=\"navBarLocation == 'bottom' || navBarLocation == 'right'\"\n      [ngClass]=\"{\n        vertical: navBarLocation == 'right',\n        horizontal: navBarLocation == 'bottom',\n        small: navBarLayout == 'small',\n        'large-filled': navBarLayout == 'large-filled',\n        'large-filled-symbols': navBarLayout == 'large-filled-symbols',\n        'large-empty': navBarLayout == 'large-empty',\n        'large-empty-symbols': navBarLayout == 'large-empty-symbols'\n      }\">\n    </wizard-navigation-bar>\n  ",
                    styles: ["\n    :host {\n      display: flex;\n      justify-content: flex-start;\n    }\n    :host.vertical {\n      flex-direction: row;\n    }\n    :host.horizontal {\n      flex-direction: column;\n    }\n    :host .wizard-steps {\n      top: 0;\n      display: flex;\n    }\n    :host .wizard-steps.vertical {\n      min-width: calc(100% - 280px);\n      width: 80%;\n      height: 100%;\n      flex-direction: column;\n    }\n    :host .wizard-steps.horizontal {\n      width: 100%;\n      flex-direction: row;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    WizardComponent.ctorParameters = function () { return []; };
    WizardComponent.propDecorators = {
        'wizardSteps': [{ type: ContentChildren, args: [WizardStepComponent,] },],
        'completionStep': [{ type: ContentChild, args: [forwardRef(function () { return WizardCompletionStepComponent; }),] },],
        'navBarLocation': [{ type: Input },],
        'navBarLayout': [{ type: Input },],
        'horizontalOrientation': [{ type: HostBinding, args: ['class.horizontal',] },],
        'verticalOrientation': [{ type: HostBinding, args: ['class.vertical',] },],
    };
    return WizardComponent;
}());
export { WizardComponent };
//# sourceMappingURL=wizard.component.js.map