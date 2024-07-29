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
                    <a href="index.html" data-type="index-link">user-task-backend documentation</a>
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
                                <span class="icon ion-ios-paper"></span>README
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
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-326b4836c8edd4176c8beffe22060653e399a4984493dd05a96026da514a161bf778bd4743516c32ceb27d5b5d43e99675dbca0062f0d4d9ae4e27161d738fed"' : 'data-bs-target="#xs-controllers-links-module-AppModule-326b4836c8edd4176c8beffe22060653e399a4984493dd05a96026da514a161bf778bd4743516c32ceb27d5b5d43e99675dbca0062f0d4d9ae4e27161d738fed"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-326b4836c8edd4176c8beffe22060653e399a4984493dd05a96026da514a161bf778bd4743516c32ceb27d5b5d43e99675dbca0062f0d4d9ae4e27161d738fed"' :
                                            'id="xs-controllers-links-module-AppModule-326b4836c8edd4176c8beffe22060653e399a4984493dd05a96026da514a161bf778bd4743516c32ceb27d5b5d43e99675dbca0062f0d4d9ae4e27161d738fed"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-326b4836c8edd4176c8beffe22060653e399a4984493dd05a96026da514a161bf778bd4743516c32ceb27d5b5d43e99675dbca0062f0d4d9ae4e27161d738fed"' : 'data-bs-target="#xs-injectables-links-module-AppModule-326b4836c8edd4176c8beffe22060653e399a4984493dd05a96026da514a161bf778bd4743516c32ceb27d5b5d43e99675dbca0062f0d4d9ae4e27161d738fed"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-326b4836c8edd4176c8beffe22060653e399a4984493dd05a96026da514a161bf778bd4743516c32ceb27d5b5d43e99675dbca0062f0d4d9ae4e27161d738fed"' :
                                        'id="xs-injectables-links-module-AppModule-326b4836c8edd4176c8beffe22060653e399a4984493dd05a96026da514a161bf778bd4743516c32ceb27d5b5d43e99675dbca0062f0d4d9ae4e27161d738fed"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-a96140bb2338cf2966b1812d81a78ea796ccded4803a8a6e1d13099fc13b623e454076c0a4f4e46c75fe3c9bd6e5b66760ae19a0af728689d9ec0c6748e650e4"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-a96140bb2338cf2966b1812d81a78ea796ccded4803a8a6e1d13099fc13b623e454076c0a4f4e46c75fe3c9bd6e5b66760ae19a0af728689d9ec0c6748e650e4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-a96140bb2338cf2966b1812d81a78ea796ccded4803a8a6e1d13099fc13b623e454076c0a4f4e46c75fe3c9bd6e5b66760ae19a0af728689d9ec0c6748e650e4"' :
                                            'id="xs-controllers-links-module-UsersModule-a96140bb2338cf2966b1812d81a78ea796ccded4803a8a6e1d13099fc13b623e454076c0a4f4e46c75fe3c9bd6e5b66760ae19a0af728689d9ec0c6748e650e4"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-a96140bb2338cf2966b1812d81a78ea796ccded4803a8a6e1d13099fc13b623e454076c0a4f4e46c75fe3c9bd6e5b66760ae19a0af728689d9ec0c6748e650e4"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-a96140bb2338cf2966b1812d81a78ea796ccded4803a8a6e1d13099fc13b623e454076c0a4f4e46c75fe3c9bd6e5b66760ae19a0af728689d9ec0c6748e650e4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-a96140bb2338cf2966b1812d81a78ea796ccded4803a8a6e1d13099fc13b623e454076c0a4f4e46c75fe3c9bd6e5b66760ae19a0af728689d9ec0c6748e650e4"' :
                                        'id="xs-injectables-links-module-UsersModule-a96140bb2338cf2966b1812d81a78ea796ccded4803a8a6e1d13099fc13b623e454076c0a4f4e46c75fe3c9bd6e5b66760ae19a0af728689d9ec0c6748e650e4"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
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
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
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
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
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
                        </ul>
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