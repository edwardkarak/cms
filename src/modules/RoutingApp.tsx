import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//import { PermissionLevel } from './accounts/permissionLevel';
import { AuthorizedRoute } from './accounts/components/AuthorizedRoute';
import { PermissionLevel } from './accounts/permissionLevel';
import { withPageLayout } from './core/withPageLayout';

import { SignInPage } from './accounts/components/SignInPage';
import { ArticlesHome } from './core/components/ArticlesHome';
import { DraftsHome } from './core/components/DraftsHome';

import { CreateArticleForm } from './editor/components/CreateArticleForm';
import { EditArticleForm } from './editor/components/EditArticleForm';

import { NotFound } from './core/components/NotFound';


//The article edit and create keys are the current date so that their state is discarded when the location changes.
//Previously, after submitting an article re-entering the page would re-submit.
export const RoutingApp = ({ }) => (
    <BrowserRouter>
        <Switch>
            <Route
                path="/sign-in"
                key="sign-in"
                component={SignInPage}
            />
            <AuthorizedRoute
                path="/"
                exact={true}
                auth={PermissionLevel.Admin}
                key="/"
                component={DraftsHome}
            />
             <AuthorizedRoute
                path="/articles"
                exact={true}
                auth={PermissionLevel.Admin}
                key="/articles"
                component={ArticlesHome}
            />
            <AuthorizedRoute
                path="/article/new"
                auth={PermissionLevel.Admin}
                key={Date.now().toString() + "article/new"}
                render={() => <CreateArticleForm publish={true} />}
            />
            <AuthorizedRoute
                path="/article/edit/:slug"
                auth={PermissionLevel.Admin}
                key={Date.now().toString() + "article/edit"}
                render={({match}) => <EditArticleForm slug={match.params.slug} publish={true} />}
            />
            <AuthorizedRoute
                path="/draft/new"
                auth={PermissionLevel.Admin}
                key={Date.now().toString() + "draft/new"}
                render={() => <CreateArticleForm publish={false} />}
            />
            <AuthorizedRoute
                path="/draft/edit/:slug"
                auth={PermissionLevel.Admin}
                key={Date.now().toString() + "draft/edit"}
                render={({match}) => <EditArticleForm slug={match.params.slug} publish={false} />}
            />
            <Route
                path="*"
                key="wildcard"
                component={NotFound}
            />
        </Switch>
    </BrowserRouter>
);