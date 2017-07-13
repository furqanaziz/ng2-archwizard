import { Component } from '@angular/core';
import { WizardComponent } from './wizard.component';
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
var WizardNavigationBarComponent = (function () {
    /**
     * Constructor
     *
     * @param wizard The wizard, which includes this navigation bar
     */
    function WizardNavigationBarComponent(wizard) {
        this.wizard = wizard;
    }
    Object.defineProperty(WizardNavigationBarComponent.prototype, "wizardSteps", {
        /**
         * Returns all [[WizardStep]]s contained in the wizard
         *
         * @returns {Array<WizardStep>} An array containing all [[WizardStep]]s
         */
        get: function () {
            return this.wizard.allSteps;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationBarComponent.prototype, "numberOfWizardSteps", {
        /**
         * Returns the number of wizard steps, that need to be displaced in the navigation bar
         *
         * @returns {number} The number of wizard steps to be displayed
         */
        get: function () {
            return this.wizard.allSteps.length;
        },
        enumerable: true,
        configurable: true
    });
    WizardNavigationBarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'wizard-navigation-bar',
                    template: "\n    <ul class=\"steps-indicator steps-{{numberOfWizardSteps}}\">\n      <li *ngFor=\"let step of wizardSteps\"\n          [attr.step-symbol]=\"step.navigationSymbol\"\n          [ngStyle]=\"{\n            'font-family': step.navigationSymbolFontFamily\n          }\"\n          [ngClass]=\"{\n            default: !step.optional && !step.completed && !step.selected && !wizard.completed,\n            current: (step.selected && !step.completed && !wizard.completed),\n            done: (step.completed && !step.selected) || wizard.completed,\n            editing: step.selected && step.completed && !wizard.completed,\n            optional: step.optional && !step.completed && !step.selected && !wizard.completed\n      }\">\n        <div>\n          <a [goToStep]=\"step\">\n            <ng-container *ngIf=\"step.titleTemplate\" [ngTemplateOutlet]=\"step.titleTemplate.templateRef\"></ng-container>\n            <ng-container *ngIf=\"!step.titleTemplate\">{{step.title}}</ng-container>\n          </a>\n        </div>\n      </li>\n    </ul>\n  ",
                    styles: ["\n    /*\n     color definitions\n     */\n    /*\n     dot definitions\n     */\n    /*\n     extra distance between the bottom of the dots and the baseline texts\n     */\n    :host.horizontal.small ul.steps-indicator {\n      padding: 24px 0 10px 0;\n    }\n    :host.horizontal.small ul.steps-indicator li:not(:last-child):before {\n      background-color: #E6E6E6;\n      content: '';\n      position: absolute;\n      height: 1px;\n      width: calc(100% - 14px);\n      top: -7px;\n      left: calc(50% + 7px);\n    }\n    :host.horizontal.small ul.steps-indicator li a:after {\n      position: absolute;\n      top: -14px;\n      left: calc(50% - 7px);\n      width: 14px;\n      height: 14px;\n      content: '';\n      text-align: center;\n      vertical-align: middle;\n      line-height: 14px;\n      transition: 0.25s;\n      border-radius: 100%;\n      background-color: #E6E6E6;\n    }\n    :host.horizontal.small ul.steps-indicator li.default a:hover {\n      color: #808080;\n    }\n    :host.horizontal.small ul.steps-indicator li.current a:after {\n      background-color: #808080;\n    }\n    :host.horizontal.small ul.steps-indicator li.done a:after {\n      background-color: #339933;\n    }\n    :host.horizontal.small ul.steps-indicator li.optional a:after {\n      background-color: #38ef38;\n    }\n    :host.horizontal.small ul.steps-indicator li.editing a:after {\n      background-color: #FF0000;\n    }\n    :host.horizontal.large-filled ul.steps-indicator {\n      padding: 60px 0 10px 0;\n    }\n    :host.horizontal.large-filled ul.steps-indicator li:not(:last-child):before {\n      background-color: #E6E6E6;\n      content: '';\n      position: absolute;\n      height: 1px;\n      width: calc(100% - 50px);\n      top: -25px;\n      left: calc(50% + 25px);\n    }\n    :host.horizontal.large-filled ul.steps-indicator li a:after {\n      position: absolute;\n      top: -50px;\n      left: calc(50% - 25px);\n      width: 50px;\n      height: 50px;\n      content: '';\n      text-align: center;\n      vertical-align: middle;\n      line-height: 50px;\n      transition: 0.25s;\n      border-radius: 100%;\n      background-color: #E6E6E6;\n    }\n    :host.horizontal.large-filled ul.steps-indicator li.default a:hover {\n      color: #808080;\n    }\n    :host.horizontal.large-filled ul.steps-indicator li.current a:after {\n      background-color: #808080;\n    }\n    :host.horizontal.large-filled ul.steps-indicator li.done a:after {\n      background-color: #339933;\n    }\n    :host.horizontal.large-filled ul.steps-indicator li.optional a:after {\n      background-color: #38ef38;\n    }\n    :host.horizontal.large-filled ul.steps-indicator li.editing a:after {\n      background-color: #FF0000;\n    }\n    :host.horizontal.large-empty ul.steps-indicator {\n      padding: 60px 0 10px 0;\n    }\n    :host.horizontal.large-empty ul.steps-indicator li:not(:last-child):before {\n      background-color: #E6E6E6;\n      content: '';\n      position: absolute;\n      height: 1px;\n      width: calc(100% - 52px);\n      top: -25px;\n      left: calc(50% + 27px);\n    }\n    :host.horizontal.large-empty ul.steps-indicator li a:after {\n      position: absolute;\n      top: -50px;\n      left: calc(50% - 25px);\n      width: 50px;\n      height: 50px;\n      content: '';\n      text-align: center;\n      vertical-align: middle;\n      line-height: 50px;\n      transition: 0.25s;\n      border-radius: 100%;\n      border-width: 2px;\n      border-style: solid;\n      border-color: #E6E6E6;\n    }\n    :host.horizontal.large-empty ul.steps-indicator li.default a:hover {\n      color: #808080;\n    }\n    :host.horizontal.large-empty ul.steps-indicator li.current a:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #808080;\n    }\n    :host.horizontal.large-empty ul.steps-indicator li.done a:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #339933;\n    }\n    :host.horizontal.large-empty ul.steps-indicator li.optional a:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #38ef38;\n    }\n    :host.horizontal.large-empty ul.steps-indicator li.editing a:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #FF0000;\n    }\n    :host.horizontal.large-filled-symbols ul.steps-indicator {\n      padding: 60px 0 10px 0;\n    }\n    :host.horizontal.large-filled-symbols ul.steps-indicator li:not(:last-child):before {\n      background-color: #E6E6E6;\n      content: '';\n      position: absolute;\n      height: 1px;\n      width: calc(100% - 50px);\n      top: -25px;\n      left: calc(50% + 25px);\n    }\n    :host.horizontal.large-filled-symbols ul.steps-indicator li a:after {\n      position: absolute;\n      top: -50px;\n      left: calc(50% - 25px);\n      width: 50px;\n      height: 50px;\n      content: '';\n      text-align: center;\n      vertical-align: middle;\n      line-height: 50px;\n      transition: 0.25s;\n      border-radius: 100%;\n      background-color: #E6E6E6;\n      color: black;\n      content: attr(step-symbol);\n    }\n    :host.horizontal.large-filled-symbols ul.steps-indicator li.default a:hover {\n      color: #808080;\n    }\n    :host.horizontal.large-filled-symbols ul.steps-indicator li.current a:after {\n      background-color: #808080;\n      color: black;\n    }\n    :host.horizontal.large-filled-symbols ul.steps-indicator li.done a:after {\n      background-color: #339933;\n      color: black;\n    }\n    :host.horizontal.large-filled-symbols ul.steps-indicator li.optional a:after {\n      background-color: #38ef38;\n      color: black;\n    }\n    :host.horizontal.large-filled-symbols ul.steps-indicator li.editing a:after {\n      background-color: #FF0000;\n      color: black;\n    }\n    :host.horizontal.large-empty-symbols ul.steps-indicator {\n      padding: 60px 0 10px 0;\n    }\n    :host.horizontal.large-empty-symbols ul.steps-indicator li:not(:last-child):before {\n      background-color: #E6E6E6;\n      content: '';\n      position: absolute;\n      height: 1px;\n      width: calc(100% - 52px);\n      top: -25px;\n      left: calc(50% + 27px);\n    }\n    :host.horizontal.large-empty-symbols ul.steps-indicator li a:after {\n      position: absolute;\n      top: -50px;\n      left: calc(50% - 25px);\n      width: 50px;\n      height: 50px;\n      content: '';\n      text-align: center;\n      vertical-align: middle;\n      line-height: 50px;\n      transition: 0.25s;\n      border-radius: 100%;\n      border-width: 2px;\n      border-style: solid;\n      border-color: #E6E6E6;\n      color: #E6E6E6;\n      content: attr(step-symbol);\n    }\n    :host.horizontal.large-empty-symbols ul.steps-indicator li.default a:hover {\n      color: #808080;\n    }\n    :host.horizontal.large-empty-symbols ul.steps-indicator li.current a:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #808080;\n      color: #808080;\n    }\n    :host.horizontal.large-empty-symbols ul.steps-indicator li.done a:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #339933;\n      color: #339933;\n    }\n    :host.horizontal.large-empty-symbols ul.steps-indicator li.optional a:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #38ef38;\n      color: #38ef38;\n    }\n    :host.horizontal.large-empty-symbols ul.steps-indicator li.editing a:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #FF0000;\n      color: #FF0000;\n    }\n    :host.horizontal ul.steps-indicator {\n      display: flex;\n      flex-direction: row;\n      justify-content: center;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      margin: 0;\n      width: 100%;\n      list-style: none;\n      /* --- http://www.paulirish.com/2012/box-sizing-border-box-ftw/ ---- */\n    }\n    :host.horizontal ul.steps-indicator.steps-2:before {\n      left: 25%;\n      right: 25%;\n    }\n    :host.horizontal ul.steps-indicator.steps-2 li {\n      width: 50%;\n    }\n    :host.horizontal ul.steps-indicator.steps-3:before {\n      left: 16.66666667%;\n      right: 16.66666667%;\n    }\n    :host.horizontal ul.steps-indicator.steps-3 li {\n      width: 33.33333333%;\n    }\n    :host.horizontal ul.steps-indicator.steps-4:before {\n      left: 12.5%;\n      right: 12.5%;\n    }\n    :host.horizontal ul.steps-indicator.steps-4 li {\n      width: 25%;\n    }\n    :host.horizontal ul.steps-indicator.steps-5:before {\n      left: 10%;\n      right: 10%;\n    }\n    :host.horizontal ul.steps-indicator.steps-5 li {\n      width: 20%;\n    }\n    :host.horizontal ul.steps-indicator.steps-6:before {\n      left: 8.33333333%;\n      right: 8.33333333%;\n    }\n    :host.horizontal ul.steps-indicator.steps-6 li {\n      width: 16.66666667%;\n    }\n    :host.horizontal ul.steps-indicator.steps-7:before {\n      left: 7.14285714%;\n      right: 7.14285714%;\n    }\n    :host.horizontal ul.steps-indicator.steps-7 li {\n      width: 14.28571429%;\n    }\n    :host.horizontal ul.steps-indicator.steps-8:before {\n      left: 6.25%;\n      right: 6.25%;\n    }\n    :host.horizontal ul.steps-indicator.steps-8 li {\n      width: 12.5%;\n    }\n    :host.horizontal ul.steps-indicator.steps-9:before {\n      left: 5.55555556%;\n      right: 5.55555556%;\n    }\n    :host.horizontal ul.steps-indicator.steps-9 li {\n      width: 11.11111111%;\n    }\n    :host.horizontal ul.steps-indicator.steps-10:before {\n      left: 5%;\n      right: 5%;\n    }\n    :host.horizontal ul.steps-indicator.steps-10 li {\n      width: 10%;\n    }\n    :host.horizontal ul.steps-indicator * {\n      -webkit-box-sizing: border-box;\n      -moz-box-sizing: border-box;\n      box-sizing: border-box;\n    }\n    :host.horizontal ul.steps-indicator li {\n      position: relative;\n      margin: 0;\n      padding: 10px 0 0 0;\n    }\n    :host.horizontal ul.steps-indicator li div {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n    }\n    :host.horizontal ul.steps-indicator li div a {\n      color: #808080;\n      line-height: 14px;\n      text-decoration: none;\n      text-transform: uppercase;\n      text-align: center;\n      font-weight: bold;\n      transition: 0.25s;\n      cursor: pointer;\n    }\n    :host.horizontal ul.steps-indicator li div a:hover {\n      color: #4d4d4d;\n    }\n    :host.horizontal ul.steps-indicator li.default,\n    :host.horizontal ul.steps-indicator li.current,\n    :host.horizontal ul.steps-indicator li.optional,\n    :host.horizontal ul.steps-indicator li.editing {\n      pointer-events: stroke;\n    }\n    /*\n     color definitions\n     */\n    /*\n     dot definitions\n     */\n    /*\n     extra distance between the bottom of the dots and the baseline texts\n     */\n    :host.vertical {\n      max-width: 280px;\n      width: 20%;\n      height: 100%;\n      position: sticky;\n      top: 0;\n    }\n    :host.vertical.small ul.steps-indicator {\n      padding: 5px 5px 5px 19px;\n    }\n    :host.vertical.small ul.steps-indicator li:not(:last-child):before {\n      background-color: #E6E6E6;\n      content: '';\n      position: absolute;\n      left: -7px;\n      top: 14px;\n      height: calc(100% - 14px);\n      width: 1px;\n    }\n    :host.vertical.small ul.steps-indicator li a:after {\n      position: absolute;\n      top: 0;\n      left: -14px;\n      width: 14px;\n      height: 14px;\n      content: '';\n      text-align: center;\n      vertical-align: middle;\n      line-height: 14px;\n      transition: 0.25s;\n      border-radius: 100%;\n      background-color: #E6E6E6;\n    }\n    :host.vertical.small ul.steps-indicator li div {\n      min-height: 14px;\n    }\n    :host.vertical.small ul.steps-indicator li.default a:hover {\n      color: #808080;\n    }\n    :host.vertical.small ul.steps-indicator li.current a:after {\n      background-color: #808080;\n    }\n    :host.vertical.small ul.steps-indicator li.done a:after {\n      background-color: #339933;\n    }\n    :host.vertical.small ul.steps-indicator li.optional a:after {\n      background-color: #38ef38;\n    }\n    :host.vertical.small ul.steps-indicator li.editing a:after {\n      background-color: #FF0000;\n    }\n    :host.vertical.large-filled ul.steps-indicator {\n      padding: 5px 5px 5px 55px;\n    }\n    :host.vertical.large-filled ul.steps-indicator li:not(:last-child):before {\n      background-color: #E6E6E6;\n      content: '';\n      position: absolute;\n      left: -25px;\n      top: 50px;\n      height: calc(100% - 50px);\n      width: 1px;\n    }\n    :host.vertical.large-filled ul.steps-indicator li a:after {\n      position: absolute;\n      top: 0;\n      left: -50px;\n      width: 50px;\n      height: 50px;\n      content: '';\n      text-align: center;\n      vertical-align: middle;\n      line-height: 50px;\n      transition: 0.25s;\n      border-radius: 100%;\n      background-color: #E6E6E6;\n    }\n    :host.vertical.large-filled ul.steps-indicator li div {\n      min-height: 50px;\n    }\n    :host.vertical.large-filled ul.steps-indicator li.default a:hover {\n      color: #808080;\n    }\n    :host.vertical.large-filled ul.steps-indicator li.current a:after {\n      background-color: #808080;\n    }\n    :host.vertical.large-filled ul.steps-indicator li.done a:after {\n      background-color: #339933;\n    }\n    :host.vertical.large-filled ul.steps-indicator li.optional a:after {\n      background-color: #38ef38;\n    }\n    :host.vertical.large-filled ul.steps-indicator li.editing a:after {\n      background-color: #FF0000;\n    }\n    :host.vertical.large-empty ul.steps-indicator {\n      padding: 5px 5px 5px 55px;\n    }\n    :host.vertical.large-empty ul.steps-indicator li:not(:last-child):before {\n      background-color: #E6E6E6;\n      content: '';\n      position: absolute;\n      left: -25px;\n      top: 52px;\n      height: calc(100% - 52px);\n      width: 1px;\n    }\n    :host.vertical.large-empty ul.steps-indicator li a:after {\n      position: absolute;\n      top: 0;\n      left: -50px;\n      width: 50px;\n      height: 50px;\n      content: '';\n      text-align: center;\n      vertical-align: middle;\n      line-height: 50px;\n      transition: 0.25s;\n      border-radius: 100%;\n      border-width: 2px;\n      border-style: solid;\n      border-color: #E6E6E6;\n    }\n    :host.vertical.large-empty ul.steps-indicator li div {\n      min-height: 54px;\n    }\n    :host.vertical.large-empty ul.steps-indicator li.default a:hover {\n      color: #808080;\n    }\n    :host.vertical.large-empty ul.steps-indicator li.current a:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #808080;\n    }\n    :host.vertical.large-empty ul.steps-indicator li.done a:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #339933;\n    }\n    :host.vertical.large-empty ul.steps-indicator li.optional a:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #38ef38;\n    }\n    :host.vertical.large-empty ul.steps-indicator li.editing a:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #FF0000;\n    }\n    :host.vertical.large-filled-symbols ul.steps-indicator {\n      padding: 5px 5px 5px 55px;\n    }\n    :host.vertical.large-filled-symbols ul.steps-indicator li:not(:last-child):before {\n      background-color: #E6E6E6;\n      content: '';\n      position: absolute;\n      left: -25px;\n      top: 50px;\n      height: calc(100% - 50px);\n      width: 1px;\n    }\n    :host.vertical.large-filled-symbols ul.steps-indicator li a:after {\n      position: absolute;\n      top: 0;\n      left: -50px;\n      width: 50px;\n      height: 50px;\n      content: '';\n      text-align: center;\n      vertical-align: middle;\n      line-height: 50px;\n      transition: 0.25s;\n      border-radius: 100%;\n      background-color: #E6E6E6;\n      color: black;\n      content: attr(step-symbol);\n    }\n    :host.vertical.large-filled-symbols ul.steps-indicator li div {\n      min-height: 50px;\n    }\n    :host.vertical.large-filled-symbols ul.steps-indicator li.default a:hover {\n      color: #808080;\n    }\n    :host.vertical.large-filled-symbols ul.steps-indicator li.current a:after {\n      background-color: #808080;\n      color: black;\n    }\n    :host.vertical.large-filled-symbols ul.steps-indicator li.done a:after {\n      background-color: #339933;\n      color: black;\n    }\n    :host.vertical.large-filled-symbols ul.steps-indicator li.optional a:after {\n      background-color: #38ef38;\n      color: black;\n    }\n    :host.vertical.large-filled-symbols ul.steps-indicator li.editing a:after {\n      background-color: #FF0000;\n      color: black;\n    }\n    :host.vertical.large-empty-symbols ul.steps-indicator {\n      padding: 5px 5px 5px 55px;\n    }\n    :host.vertical.large-empty-symbols ul.steps-indicator li:not(:last-child):before {\n      background-color: #E6E6E6;\n      content: '';\n      position: absolute;\n      left: -25px;\n      top: 52px;\n      height: calc(100% - 52px);\n      width: 1px;\n    }\n    :host.vertical.large-empty-symbols ul.steps-indicator li a:after {\n      position: absolute;\n      top: 0;\n      left: -50px;\n      width: 50px;\n      height: 50px;\n      content: '';\n      text-align: center;\n      vertical-align: middle;\n      line-height: 50px;\n      transition: 0.25s;\n      border-radius: 100%;\n      border-width: 2px;\n      border-style: solid;\n      border-color: #E6E6E6;\n      color: #E6E6E6;\n      content: attr(step-symbol);\n    }\n    :host.vertical.large-empty-symbols ul.steps-indicator li div {\n      min-height: 54px;\n    }\n    :host.vertical.large-empty-symbols ul.steps-indicator li.default a:hover {\n      color: #808080;\n    }\n    :host.vertical.large-empty-symbols ul.steps-indicator li.current a:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #808080;\n      color: #808080;\n    }\n    :host.vertical.large-empty-symbols ul.steps-indicator li.done a:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #339933;\n      color: #339933;\n    }\n    :host.vertical.large-empty-symbols ul.steps-indicator li.optional a:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #38ef38;\n      color: #38ef38;\n    }\n    :host.vertical.large-empty-symbols ul.steps-indicator li.editing a:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #FF0000;\n      color: #FF0000;\n    }\n    :host.vertical ul.steps-indicator {\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      list-style: none;\n      margin: auto;\n      /* --- http://www.paulirish.com/2012/box-sizing-border-box-ftw/ ---- */\n    }\n    :host.vertical ul.steps-indicator * {\n      -webkit-box-sizing: border-box;\n      -moz-box-sizing: border-box;\n      box-sizing: border-box;\n    }\n    :host.vertical ul.steps-indicator li {\n      position: relative;\n    }\n    :host.vertical ul.steps-indicator li:not(:last-child) {\n      margin-bottom: 0;\n      padding-bottom: 10px;\n    }\n    :host.vertical ul.steps-indicator li div {\n      display: flex;\n      flex-direction: row;\n      align-items: center;\n    }\n    :host.vertical ul.steps-indicator li div a {\n      color: #808080;\n      margin-left: 15px;\n      line-height: 14px;\n      text-decoration: none;\n      text-transform: uppercase;\n      text-align: left;\n      font-weight: bold;\n      transition: 0.25s;\n      cursor: pointer;\n    }\n    :host.vertical ul.steps-indicator li div a:hover {\n      color: #4d4d4d;\n    }\n    :host.vertical ul.steps-indicator li.default,\n    :host.vertical ul.steps-indicator li.current,\n    :host.vertical ul.steps-indicator li.optional,\n    :host.vertical ul.steps-indicator li.editing {\n      pointer-events: none;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    WizardNavigationBarComponent.ctorParameters = function () { return [
        { type: WizardComponent, },
    ]; };
    return WizardNavigationBarComponent;
}());
export { WizardNavigationBarComponent };
//# sourceMappingURL=wizard-navigation-bar.component.js.map