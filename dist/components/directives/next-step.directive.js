import { Directive, Output, HostListener, EventEmitter } from '@angular/core';
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
var NextStepDirective = (function () {
    /**
     * Constructor
     *
     * @param wizard The [[WizardComponent]], this directive is used inside
     */
    function NextStepDirective(wizard) {
        this.wizard = wizard;
        /**
         * An EventEmitter to be called when this directive is used to exit the current step.
         * This EventEmitter can be used to do cleanup work
         *
         * @type {EventEmitter}
         */
        this.finalize = new EventEmitter();
    }
    /**
     * Listener method for `click` events on the component with this directive.
     * After this method is called the wizard will try to transition to the next step
     */
    NextStepDirective.prototype.onClick = function () {
        if (this.wizard.canGoToNextStep()) {
            this.finalize.emit();
            this.wizard.goToNextStep();
        }
    };
    NextStepDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[nextStep]'
                },] },
    ];
    /** @nocollapse */
    NextStepDirective.ctorParameters = function () { return [
        { type: WizardComponent, },
    ]; };
    NextStepDirective.propDecorators = {
        'finalize': [{ type: Output },],
        'onClick': [{ type: HostListener, args: ['click', ['$event'],] },],
    };
    return NextStepDirective;
}());
export { NextStepDirective };
//# sourceMappingURL=next-step.directive.js.map