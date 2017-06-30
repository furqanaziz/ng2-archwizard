import { Directive } from '@angular/core';
import { WizardStepComponent } from '../components/wizard-step.component';
/**
 * The `optionalStep` directive can be used to define an optional `wizard-step`.
 * An optional `wizard-step` is a [[WizardStepComponent]] that doesn't need to be completed to transition to later wizard steps.
 * It's important to note, that this directive can only be used on a [[WizardStepComponent]] and not a [[WizardCompletionStepComponent]]
 *
 * ### Syntax
 *
 * ```html
 * <wizard-step optionalStep>
 *     ...
 * </wizard-step>
 * ```
 *
 * ### Example
 *
 * ```html
 * <wizard-step title="Second step" optionalStep>
 *     ...
 * </wizard-step>
 * ```
 *
 * @author Marc Arndt
 */
var OptionalStepDirective = (function () {
    /**
     * Constructor
     *
     * @param wizardStep The wizard, which contains this [[OptionalStepDirective]]
     */
    function OptionalStepDirective(wizardStep) {
        this.wizardStep = wizardStep;
    }
    /**
     * Initialization work
     */
    OptionalStepDirective.prototype.ngOnInit = function () {
        this.wizardStep.optional = true;
    };
    OptionalStepDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'wizard-step[optionalStep]'
                },] },
    ];
    /** @nocollapse */
    OptionalStepDirective.ctorParameters = function () { return [
        { type: WizardStepComponent, },
    ]; };
    return OptionalStepDirective;
}());
export { OptionalStepDirective };
//# sourceMappingURL=optional-step.directive.js.map