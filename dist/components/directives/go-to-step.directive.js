/**
 * Created by marc on 09.01.17.
 */
import { Directive, Output, HostListener, EventEmitter, Input, Optional } from '@angular/core';
import { WizardComponent } from '../components/wizard.component';
import { WizardStepComponent } from '../components/wizard-step.component';
import { isStepOffset } from '../util/StepOffset';
import { isNumber, isString } from 'util';
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
var GoToStepDirective = (function () {
    /**
     * Constructor
     *
     * @param wizard The wizard, which contains this [[GoToStepDirective]]
     * @param wizardStep The wizard step, which contains this [[GoToStepDirective]]
     */
    function GoToStepDirective(wizard, wizardStep) {
        this.wizard = wizard;
        this.wizardStep = wizardStep;
        /**
         * An EventEmitter to be called when this directive is used to exit the current step.
         * This EventEmitter can be used to do cleanup work
         *
         * @type {EventEmitter}
         */
        this.finalize = new EventEmitter();
    }
    Object.defineProperty(GoToStepDirective.prototype, "destinationStep", {
        /**
         * Returns the destination step of this directive as an absolute step index inside the wizard
         *
         * @returns {number} The index of the destination step
         * @throws If `goToStep` is of an unknown type an `Error` is thrown
         */
        get: function () {
            var destinationStep;
            if (isNumber(this.goToStep)) {
                destinationStep = this.goToStep;
            }
            else if (isString(this.goToStep)) {
                destinationStep = parseInt(this.goToStep, 10);
            }
            else if (isStepOffset(this.goToStep) && this.wizardStep !== null) {
                destinationStep = this.wizard.getIndexOfStep(this.wizardStep) + this.goToStep.stepOffset;
            }
            else if (this.goToStep instanceof WizardStepComponent) {
                destinationStep = this.wizard.getIndexOfStep(this.goToStep);
            }
            else {
                throw new Error("Input 'goToStep' is neither a WizardStep, StepOffset, number or string");
            }
            return destinationStep;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Listener method for `click` events on the component with this directive.
     * After this method is called the wizard will try to transition to the `destinationStep`
     */
    GoToStepDirective.prototype.onClick = function () {
        this.goToClosestValidStep(this.wizard.currentStepIndex, this.destinationStep, true);
        this.goToClosestValidStep(this.destinationStep, this.wizard.currentStepIndex, false);
    };
    GoToStepDirective.prototype.goToClosestValidStep = function (min, max, asc) {
        for (var i = asc ? min : max; (asc && i <= max) || (!asc && i >= min && i >= 0);) {
            var direction = this.wizard.getMovingDirection(i);
            this.finalize.emit();
            this.wizard.goToStep(i);
            if (!this.wizard.canGoToStep(i) || !this.wizard.canExitStep(this.wizard.allSteps[i], direction)) {
                break;
            }
            i = asc ? i + 1 : i - 1;
        }
    };
    GoToStepDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[goToStep]'
                },] },
    ];
    /** @nocollapse */
    GoToStepDirective.ctorParameters = function () { return [
        { type: WizardComponent, },
        { type: WizardStepComponent, decorators: [{ type: Optional },] },
    ]; };
    GoToStepDirective.propDecorators = {
        'finalize': [{ type: Output },],
        'goToStep': [{ type: Input },],
        'onClick': [{ type: HostListener, args: ['click', ['$event'],] },],
    };
    return GoToStepDirective;
}());
export { GoToStepDirective };
//# sourceMappingURL=go-to-step.directive.js.map