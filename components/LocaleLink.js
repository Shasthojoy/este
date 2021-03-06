// @flow
import type { State } from '../types';
import NextLink from 'next/link';
import * as React from 'react';
import parse from 'url-parse';
import { connect, type Connector, type MapStateToProps } from 'react-redux';

// Link with current locale in query.

const LocaleLink = ({ children, href, prefetch, locale, defaultLocale }) => {
  let localeHref = href;
  const parsed = parse(href, true);
  const isRelative = href.charAt(0) === '/';
  const isNotDefault = locale !== defaultLocale;
  const hasNoLocale = !parsed.query.locale;
  const setLocale = isRelative && isNotDefault && hasNoLocale;
  if (setLocale) {
    parsed.set('query', { ...parsed.query, locale });
    localeHref = parsed.href.replace(parsed.origin, '');
  }
  return (
    <NextLink href={localeHref} prefetch={prefetch}>
      {React.cloneElement(children, { href: localeHref })}
    </NextLink>
  );
};

type OwnProps = {
  children: React.Element<any>,
  href: string,
  prefetch?: boolean,
};

const mapStateToProps: MapStateToProps<*, *, *> = (state: State) => ({
  locale: state.app.locale,
  defaultLocale: state.app.defaultLocale,
});

const connector: Connector<OwnProps, *> = connect(mapStateToProps);

export default connector(LocaleLink);
