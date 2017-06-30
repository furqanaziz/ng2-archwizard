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
export declare class PreviousStepDirective {
    private wizard;
    /**
     * Constructor
     *
     * @param wizard The [[WizardComponent]], this directive is used inside
     */
    constructor(wizard: WizardComponent);
    /**
     * Listener method for `click` events on the component with this directive.
     * After this method is called the wizard will try to transition to the previous step
     */
    onClick(): void;
}
