import { Directive, HostListener } from '@angular/core';
import { WizardComponent } from '../components/wizard.component';
/**
 * The `previousStep` directive can be used to navigate to the previous step.
 * Compared to the [[NextStepDirective]] it's important to note, that this directive doesn't contain a `finalize` output method.
 *
 * ### Syntax
 *
 * ```html
 * <button previousStep>...</button>
 * ```
 *
 * @author Marc Arndt
 */
var PreviousStepDirective = (function () {
    /**
     * Constructor
     *
     * @param wizard The [[WizardComponent]], this directive is used inside
     */
    function PreviousStepDirective(wizard) {
        this.wizard = wizard;
    }
    /**
     * Listener method for `click` events on the component with this directive.
     * After this method is called the wizard will try to transition to the previous step
     */
    PreviousStepDirective.prototype.onClick = function () {
        if (this.wizard.canGoToPreviousStep()) {
            this.wizard.goToPreviousStep();
        }
    };
    PreviousStepDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[previousStep]'
                },] },
    ];
    /** @nocollapse */
    PreviousStepDirective.ctorParameters = function () { return [
        { type: WizardComponent, },
    ]; };
    PreviousStepDirective.propDecorators = {
        'onClick': [{ type: HostListener, args: ['click', ['$event'],] },],
    };
    return PreviousStepDirective;
}());
export { PreviousStepDirective };
//# sourceMappingURL=previous-step.directive.js.map