/**
 * Created by marc on 20.05.17.
 */
import { EventEmitter } from '@angular/core';
import { MovingDirection } from '../util/MovingDirection';
import { WizardComponent } from './wizard.component';
import { WizardStep } from '../util/WizardStep';
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
export declare class WizardCompletionStepComponent implements WizardStep {
    private wizard;
    /**
     * @inheritDoc
     */
    titleTemplate: WizardStepTitleDirective;
    /**
     * @inheritDoc
     */
    title: string;
    /**
     * @inheritDoc
     */
    navigationSymbol: string;
    /**
     * @inheritDoc
     */
    navigationSymbolFontFamily: string;
    /**
     * This EventEmitter is called when the step is entered.
     * The bound method should be used to do initialization work.
     *
     * @type {EventEmitter<MovingDirection>}
     */
    stepEnter: EventEmitter<MovingDirection>;
    /**
     * This EventEmitter is called when the step is exited.
     * The bound method can be used to do cleanup work.
     *
     * @type {EventEmitter<MovingDirection>}
     */
    stepExit: EventEmitter<MovingDirection>;
    /**
     * Returns if this wizard step should be visible to the user.
     * If the step should be visible to the user false is returned, otherwise true
     *
     * @returns {boolean}
     */
    readonly hidden: boolean;
    /**
     * @inheritDoc
     */
    completed: false;
    /**
     * @inheritDoc
     */
    selected: boolean;
    /**
     * @inheritDoc
     */
    optional: boolean;
    /**
     * @inheritDoc
     */
    canExit: ((direction: MovingDirection) => boolean) | boolean;
    /**
     * Constructor
     * @param wizard The [[WizardComponent]], this completion step is contained inside
     */
    constructor(wizard: WizardComponent);
    /**
     * @inheritDoc
     */
    enter(direction: MovingDirection): void;
    /**
     * @inheritDoc
     */
    exit(direction: MovingDirection): void;
}
