'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">delifhery-frontend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/App.html" data-type="entity-link" >App</a>
                            </li>
                            <li class="link">
                                <a href="components/CreateShipment.html" data-type="entity-link" >CreateShipment</a>
                            </li>
                            <li class="link">
                                <a href="components/Footer.html" data-type="entity-link" >Footer</a>
                            </li>
                            <li class="link">
                                <a href="components/Header.html" data-type="entity-link" >Header</a>
                            </li>
                            <li class="link">
                                <a href="components/Home.html" data-type="entity-link" >Home</a>
                            </li>
                            <li class="link">
                                <a href="components/MyContact.html" data-type="entity-link" >MyContact</a>
                            </li>
                            <li class="link">
                                <a href="components/MyShipments.html" data-type="entity-link" >MyShipments</a>
                            </li>
                            <li class="link">
                                <a href="components/PaymentComplete.html" data-type="entity-link" >PaymentComplete</a>
                            </li>
                            <li class="link">
                                <a href="components/ShippingCost.html" data-type="entity-link" >ShippingCost</a>
                            </li>
                            <li class="link">
                                <a href="components/Tracking.html" data-type="entity-link" >Tracking</a>
                            </li>
                            <li class="link">
                                <a href="components/TrackingDetails.html" data-type="entity-link" >TrackingDetails</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ContactMethodService.html" data-type="entity-link" >ContactMethodService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomerInitService.html" data-type="entity-link" >CustomerInitService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationService.html" data-type="entity-link" >NotificationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ShipmentService.html" data-type="entity-link" >ShipmentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ShippingCostService.html" data-type="entity-link" >ShippingCostService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TrackingService.html" data-type="entity-link" >TrackingService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ContactMethod.html" data-type="entity-link" >ContactMethod</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MyShipmentListDto.html" data-type="entity-link" >MyShipmentListDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaymentSummary.html" data-type="entity-link" >PaymentSummary</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ShipmentRequest.html" data-type="entity-link" >ShipmentRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ShipmentResponse.html" data-type="entity-link" >ShipmentResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ShippingPriceRequest.html" data-type="entity-link" >ShippingPriceRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ShippingPriceResponse.html" data-type="entity-link" >ShippingPriceResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SubscriptionStatusDto.html" data-type="entity-link" >SubscriptionStatusDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TrackingStatusEvent.html" data-type="entity-link" >TrackingStatusEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TrackingStatusRequest.html" data-type="entity-link" >TrackingStatusRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TrackingStatusResponse.html" data-type="entity-link" >TrackingStatusResponse</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});