import { Component, ContentChild, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { WizardStepTitleDirective } from '../directives/wizard-step-title.directive';
/**
 * The `wizard-step` component is used to define a normal step inside a wizard.
 *
 * ### Syntax
 *
 * With `title` input:
 *
 * ```html
 * <wizard-step [title]="step title" [navigationSymbol]="symbol" [navigationSymbolFontFamily]="font-family"
 *    [canExit]="deciding function" (stepEnter)="enter function" (stepExit)="exit function">
 *    ...
 * </wizard-step>
 * ```
 *
 * With `wizardStepTitle` directive:
 *
 * ```html
 * <wizard-step [navigationSymbol]="symbol" [navigationSymbolFontFamily]="font-family"
 *    [canExit]="deciding function" (stepEnter)="enter function" (stepExit)="exit function">
 *    <ng-template wizardStepTitle>
 *        step title
 *    </ng-template>
 *    ...
 * </wizard-step>
 * ```
 *
 * ### Example
 *
 * With `title` input:
 *
 * ```html
 * <wizard-step title="Address information" navigationSymbol="&#xf1ba;" navigationSymbolFontFamily="FontAwesome">
 *    ...
 * </wizard-step>
 * ```
 *
 * With `wizardStepTitle` directive:
 *
 * ```html
 * <wizard-step navigationSymbol="&#xf1ba;" navigationSymbolFontFamily="FontAwesome">
 *    <ng-template wizardStepTitle>
 *        Address information
 *    </ng-template>
 * </wizard-step>
 * ```
 *
 * @author Marc Arndt
 */
var WizardStepComponent = (function () {
    /**
     * Constructor
     */
    function WizardStepComponent() {
        /**
         * @inheritDoc
         */
        this.navigationSymbol = '';
        /**
         * @inheritDoc
         */
        this.canExit = true;
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
        this.completed = false;
        /**
         * @inheritDoc
         */
        this.selected = false;
        /**
         * @inheritDoc
         */
        this.optional = false;
    }
    Object.defineProperty(WizardStepComponent.prototype, "hidden", {
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
    WizardStepComponent.prototype.enter = function (direction) {
        this.stepEnter.emit(direction);
    };
    /**
     * @inheritDoc
     */
    WizardStepComponent.prototype.exit = function (direction) {
        this.stepExit.emit(direction);
    };
    WizardStepComponent.decorators = [
        { type: Component, args: [{
                    selector: 'wizard-step',
                    template: "\n    <ng-content></ng-content>\n  ",
                    styles: ["\n    :host {\n      height: auto;\n      width: 100%;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    WizardStepComponent.ctorParameters = function () { return []; };
    WizardStepComponent.propDecorators = {
        'titleTemplate': [{ type: ContentChild, args: [WizardStepTitleDirective,] },],
        'title': [{ type: Input },],
        'navigationSymbol': [{ type: Input },],
        'navigationSymbolFontFamily': [{ type: Input },],
        'canExit': [{ type: Input },],
        'stepEnter': [{ type: Output },],
        'stepExit': [{ type: Output },],
        'hidden': [{ type: HostBinding, args: ['hidden',] },],
    };
    return WizardStepComponent;
}());
export { WizardStepComponent };
//# sourceMappingURL=wizard-step.component.js.map