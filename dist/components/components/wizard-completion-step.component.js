/**
 * Created by marc on 20.05.17.
 */
import { Component, ContentChild, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { WizardComponent } from './wizard.component';
import { WizardStepTitleDirective } from '../directives/wizard-step-title.directive';
/**
 * The `wizard-completion-step` component can be used to define a completion/success step at the end of your wizard
 * After a `wizard-completion-step` has been entered, it has the characteristic that the user is blocked from
 * leaving it again to a previous step.
 * In addition entering a `wizard-completion-step` automatically sets the `wizard` amd all steps inside the `wizard`
 * as completed.
 *
 * ### Syntax
 *
 * ```html
 * <wizard-completion-step [title]="title of the wizard step" [navigationSymbol]="navigation symbol"
 *    [navigationSymbolFontFamily]="navigation symbol font family"
 *    (stepEnter)="event emitter to be called when the wizard step is entered"
 *    (stepExit)="event emitter to be called when the wizard step is exited">
 *    ...
 * </wizard-completion-step>
 * ```
 *
 * ### Example
 *
 * ```html
 * <wizard-completion-step title="Step 1" navigationSymbol="1">
 *    ...
 * </wizard-completion-step>
 * ```
 *
 * With a navigation symbol from the `font-awesome` font:
 *
 * ```html
 * <wizard-completion-step title="Step 1" navigationSymbol="&#xf1ba;" navigationSymbolFontFamily="FontAwesome">
 *    ...
 * </wizard-completion-step>
 * ```
 *
 * @author Marc Arndt
 */
var WizardCompletionStepComponent = (function () {
    /**
     * Constructor
     * @param wizard The [[WizardComponent]], this completion step is contained inside
     */
    function WizardCompletionStepComponent(wizard) {
        this.wizard = wizard;
        /**
         * @inheritDoc
         */
        this.navigationSymbol = '';
        /**
         * This EventEmitter is called when the step is entered.
         * The bound method should be used to do initialization work.
         *
         * @type {EventEmitter<MovingDirection>}
         */
        this.stepEnter = new EventEmitter();
        /**
         * This EventEmitter is called when the step is exited.
         * The bound method can be used to do cleanup work.
         *
         * @type {EventEmitter<MovingDirection>}
         */
        this.stepExit = new EventEmitter();
        /**
         * @inheritDoc
         */
        this.selected = false;
        /**
         * @inheritDoc
         */
        this.optional = false;
        /**
         * @inheritDoc
         */
        this.canExit = false;
    }
    Object.defineProperty(WizardCompletionStepComponent.prototype, "hidden", {
        /**
         * Returns if this wizard step should be visible to the user.
         * If the step should be visible to the user false is returned, otherwise true
         *
         * @returns {boolean}
         */
        get: function () {
            return !this.selected;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    WizardCompletionStepComponent.prototype.enter = function (direction) {
        this.wizard.completed = true;
        this.stepEnter.emit(direction);
    };
    /**
     * @inheritDoc
     */
    WizardCompletionStepComponent.prototype.exit = function (direction) {
        // do nothing
    };
    WizardCompletionStepComponent.decorators = [
        { type: Component, args: [{
                    selector: 'wizard-completion-step',
                    template: "\n    <ng-content></ng-content>\n  ",
                    styles: ["\n    :host {\n      height: auto;\n      width: 100%;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    WizardCompletionStepComponent.ctorParameters = function () { return [
        { type: WizardComponent, },
    ]; };
    WizardCompletionStepComponent.propDecorators = {
        'titleTemplate': [{ type: ContentChild, args: [WizardStepTitleDirective,] },],
        'title': [{ type: Input },],
        'navigationSymbol': [{ type: Input },],
        'navigationSymbolFontFamily': [{ type: Input },],
        'stepEnter': [{ type: Output },],
        'hidden': [{ type: HostBinding, args: ['hidden',] },],
    };
    return WizardCompletionStepComponent;
}());
export { WizardCompletionStepComponent };
//# sourceMappingURL=wizard-completion-step.component.js.map