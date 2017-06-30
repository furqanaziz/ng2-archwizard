import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WizardComponent } from './components/wizard.component';
import { WizardNavigationBarComponent } from './components/wizard-navigation-bar.component';
import { WizardStepComponent } from './components/wizard-step.component';
import { WizardCompletionStepComponent } from './components/wizard-completion-step.component';
import { NextStepDirective } from './directives/next-step.directive';
import { PreviousStepDirective } from './directives/previous-step.directive';
import { OptionalStepDirective } from './directives/optional-step.directive';
import { GoToStepDirective } from './directives/go-to-step.directive';
import { WizardStepTitleDirective } from './directives/wizard-step-title.directive';
/**
 * The module defining all the content inside `ng2-archwizard`
 *
 * @author Marc Arndt
 */
var WizardModule = (function () {
    function WizardModule() {
    }
    WizardModule.forRoot = function () {
        return { ngModule: WizardModule, providers: [] };
    };
    WizardModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        WizardComponent,
                        WizardStepComponent,
                        WizardNavigationBarComponent,
                        WizardCompletionStepComponent,
                        GoToStepDirective,
                        NextStepDirective,
                        PreviousStepDirective,
                        OptionalStepDirective,
                        WizardStepTitleDirective
                    ],
                    imports: [
                        CommonModule
                    ],
                    exports: [
                        WizardComponent,
                        WizardStepComponent,
                        WizardNavigationBarComponent,
                        WizardCompletionStepComponent,
                        GoToStepDirective,
                        NextStepDirective,
                        PreviousStepDirective,
                        OptionalStepDirective,
                        WizardStepTitleDirective
                    ]
                },] },
    ];
    /** @nocollapse */
    WizardModule.ctorParameters = function () { return []; };
    return WizardModule;
}());
export { WizardModule };
//# sourceMappingURL=wizard.module.js.map