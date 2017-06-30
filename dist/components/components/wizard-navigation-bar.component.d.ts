import { WizardComponent } from './wizard.component';
import { WizardStep } from '../util/WizardStep';
/**
 * The `wizard-navigation-bar` component contains the navigation bar inside a [[WizardComponent]].
 * To correctly display the navigation bar, it's required to set the right css classes for the navigation bar,
 * otherwise it will look like a normal `ul` component.
 *
 * ### Syntax
 *
 * ```html
 * <wizard-navigation-bar></wizard-navigation-bar>
 * ```
 *
 * @author Marc Arndt
 */
export declare class WizardNavigationBarComponent {
    private wizard;
    /**
     * Constructor
     *
     * @param wizard The wizard, which includes this navigation bar
     */
    constructor(wizard: WizardComponent);
    /**
     * Returns all [[WizardStep]]s contained in the wizard
     *
     * @returns {Array<WizardStep>} An array containing all [[WizardStep]]s
     */
    readonly wizardSteps: Array<WizardStep>;
    /**
     * Returns the number of wizard steps, that need to be displaced in the navigation bar
     *
     * @returns {number} The number of wizard steps to be displayed
     */
    readonly numberOfWizardSteps: number;
}
