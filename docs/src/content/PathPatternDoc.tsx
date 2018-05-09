import * as React from 'react';
import { code, codeParams } from '../utils';
import {
  Match,
  MatchSuccess,
  PathPattern,
  PathPatternWithParams
  } from '../../src';
import { MethodTitle } from '../components/MethodTitle';
import { Row } from '../components/Row';
import { Title } from '../components/Title';

const codeContent = require('../raw/PathPatternDoc.raw');

export const PathPatternDoc: React.SFC = () => {
  const createHomeRoute = code(codeContent, 'intro', () => {
    const homeRoute = new PathPattern('/home');
    return homeRoute;
  });

  const createUserRoute = code(codeContent, 'intro_user', () => {
    const userRoute = new PathPatternWithParams<{ userName: string }>('/user/:userName');
    return userRoute;
  });

  const createFooPattern = code(codeContent, 'create', () => {
    const fooPattern = new PathPattern('/foo');
    return fooPattern;
  });

  const createFooExtendedPattern = codeParams(
    codeContent,
    'extends',
    fooPattern => {
      const fooExtended = fooPattern.extends('/bar');
      return fooExtended;
    },
    createFooPattern.output
  );

  const createMatch = codeParams(
    codeContent,
    'match_type_3',
    (userRoute: PathPatternWithParams<{ userName: string }>) => {
      const match = userRoute.match('/user/etienne');
      return match;
    },
    createUserRoute.output
  );

  return (
    <>
      <Row codeObj={createHomeRoute} options={{ ignoreLastLine: true, expanded: true }}>
        <p>
          <code>PathPattern</code> is a wrapper around{' '}
          <a href="https://github.com/pillarjs/path-to-regexp">
            <code>path-to-regexp</code>
          </a>{' '}
          written in Typescript.
        </p>
      </Row>
      <Row
        codeObj={[
          codeParams(
            codeContent,
            'intro_3',
            (homeRoute: PathPattern) => homeRoute.match('/about'),
            createHomeRoute.output
          ),
          codeParams(
            codeContent,
            'intro_2',
            (homeRoute: PathPattern) => homeRoute.match('/home'),
            createHomeRoute.output
          ),
        ]}
        options={{ expanded: false }}
      >
        <p>
          It allow you to test a string, usually <code>location.pathname</code> against a certain pattern
        </p>
      </Row>
      <Row codeObj={createUserRoute} options={{ ignoreLastLine: true }}>
        <p>You can also have parameters in your pattern</p>
      </Row>
      <Row
        codeObj={codeParams(
          codeContent,
          'params',
          userRoute => userRoute.match('/user/etienne'),
          createUserRoute.output
        )}
        options={{ expanded: false }}
      >
        <p>
          When you call <code>match</code> you get the params as an object
        </p>
      </Row>
      <Row
        codeObj={codeParams(
          codeContent,
          'params_compile',
          userRoute => userRoute.compile({ userName: 'paul' }),
          createUserRoute.output
        )}
      >
        <p>
          Finnally you can <code>compile</code> a pattern to generate a path
        </p>
      </Row>

      <Title name="Match<Params>" type="type" />
      <Row>
        <p>
          The <code>Match</code> type represent the result of a match operation.
        </p>
      </Row>
      <Row>
        <pre>
          <code>
            {'type Match<Params extends object = {}> ='}
            <br />
            {'  | false'}
            <br />
            {'  | MatchSuccess<Params>'}
          </code>
        </pre>
      </Row>
      <Row
        codeObj={code(codeContent, 'match_type_1', () => {
          const notMatch: Match = false;
          return notMatch;
        })}
        options={{ ignoreLastLine: true, expanded: true }}
      >
        <p>
          <code>false</code>: when the path does not match
        </p>
      </Row>
      <Row
        codeObj={[
          code(codeContent, 'match_type_2', () => {
            const match: MatchSuccess = {
              isExact: true,
              params: {},
              path: '/:user/foo',
              url: '/etienne/foo',
            };
            return match;
          }),
        ]}
        options={{ ignoreLastLine: true, expanded: true }}
      >
        <p>
          <code>MatchSuccess</code>: when the path matches
        </p>
        <ul>
          <li>
            <code>isExact</code>: <code>true</code> if the path match the entire pattern
          </li>
          <li>
            <code>params</code>: Object of params
          </li>
          <li>
            <code>path</code>: The part of the pattern that matches
          </li>
          <li>
            <code>url</code>: The part of the path that matches
          </li>
        </ul>
      </Row>
      <Row codeObj={createMatch} options={{ ignoreOutput: true, ignoreLastLine: true }} />
      <Row
        codeObj={codeParams(
          codeContent,
          'match_type_4',
          (match: Match) => {
            const params = match === false ? null : match.params;
            return params;
          },
          createMatch.output
        )}
        options={{ ignoreLastLine: true }}
      >
        <p>
          You need to test if match is not <code>false</code> to safely access <code>MatchSuccess</code> properties
        </p>
      </Row>

      <Title name="PathPattern" type="class" />
      <MethodTitle name={'constructor(pattern: string)'} />
      <Row codeObj={createFooPattern} options={{ ignoreLastLine: true }}>
        <p>First, let's create a instance of PathPattern</p>
      </Row>

      <MethodTitle name={'match(path: string): Match'} />
      <Row
        codeObj={codeParams(
          codeContent,
          'test_success',
          fooPattern => fooPattern.match('/foo'),
          createFooPattern.output
        )}
        options={{ expanded: true }}
      >
        <p>
          You can test this pattern against a string. <br />If it match we get a MatchSuccess object.
        </p>
      </Row>
      <Row
        codeObj={codeParams(codeContent, 'match-01', fooPattern => fooPattern.match('/bar'), createFooPattern.output)}
      >
        <p>
          If the pattern doesn't match, we get <code>false</code>
        </p>
      </Row>
      <Row
        codeObj={codeParams(
          codeContent,
          'match-02',
          fooPattern => fooPattern.match('/foo/bar'),
          createFooPattern.output
        )}
      >
        <p>
          The <code>match</code> method only test the beginning of the path, so <code>/foo/bar</code> return a{' '}
          <code>MatchSuccess</code>
        </p>
      </Row>

      <MethodTitle name={'matchExact(path: string): Match'} />
      <Row
        codeObj={[
          codeParams(codeContent, 'test_3', fooPattern => fooPattern.matchExact('/foo/bar'), createFooPattern.output),
          codeParams(codeContent, 'test_4', fooPattern => fooPattern.matchExact('/foo'), createFooPattern.output),
        ]}
      >
        <p>
          You can use <code>matchExact</code> to test the entire path
        </p>
      </Row>
      <Row
        codeObj={codeParams(
          codeContent,
          'code_6',
          fooPattern => fooPattern.matchExact('/foo/'),
          createFooPattern.output
        )}
      >
        <p>
          <code>matchExact</code> allow trailing slash
        </p>
      </Row>

      <MethodTitle name={'matchStrict(path: string): Match'} />
      <Row
        codeObj={[
          codeParams(codeContent, 'code_7', fooPattern => fooPattern.matchStrict('/foo/'), createFooPattern.output),
          codeParams(codeContent, 'code_8', fooPattern => fooPattern.matchStrict('/foo'), createFooPattern.output),
        ]}
      >
        <p>
          You can use <code>matchStrict</code> if you don't want to match trailing slash
        </p>
      </Row>

      <MethodTitle name={'matchAdvanced(options?: MatchOptions)'} />
      <Row>
        <pre>
          <code>{'type MatchOptions = {\n  strict?: boolean,\n  exact?: boolean\n}'}</code>
        </pre>
      </Row>
      <Row>
        <p>
          Return type: <code>{'(path: string) => Match'}</code>
        </p>
      </Row>
      <Row
        codeObj={[
          codeParams(codeContent, 'code_9', fooPattern => fooPattern.matchAdvanced()('/foo'), createFooPattern.output),
          codeParams(
            codeContent,
            'code_10',
            fooPattern => fooPattern.matchAdvanced({ exact: true })('/foo'),
            createFooPattern.output
          ),
          codeParams(
            codeContent,
            'code_11',
            fooPattern => fooPattern.matchAdvanced({ strict: true, exact: true })('/foo'),
            createFooPattern.output
          ),
        ]}
      >
        <p>
          <code>matchAdvanced</code> let you specify <code>strict</code> and <code>exact</code> with a{' '}
          <code>MatchOptions</code> param.
        </p>
        <ul>
          <li>
            <code>match</code> is the same as <code>{'matchAdvanced({ exact: false, strict: false })'}</code>
          </li>
          <li>
            <code>matchExact</code> is the same as <code>{'matchAdvanced({ exact: true, strict: false })'}</code>
          </li>
          <li>
            <code>matchStrict</code> is the same as <code>{'matchAdvanced({ exact: true, strict: true })'}</code>
          </li>
        </ul>
      </Row>

      <MethodTitle name={'getPattern(): string'} />
      <Row codeObj={codeParams(codeContent, 'code_13', fooPattern => fooPattern.getPattern(), createFooPattern.output)}>
        <p>Return the pattern as a string.</p>
      </Row>

      <MethodTitle name={'extends(subpattern: string): PathPattern'} />
      <Row codeObj={createFooExtendedPattern} options={{ ignoreLastLine: true }}>
        <p>
          We wan <code>extends</code> a pattern to append something.
        </p>
      </Row>
      <Row
        codeObj={codeParams(
          codeContent,
          'code_14',
          fooExtended => fooExtended.matchExact('/foo/bar'),
          createFooExtendedPattern.output
        )}
      />

      <Title name="PathPatternWithParams" type="class" />
      <MethodTitle name="constructor<Params>(pattern: string)" />
      <Row codeObj={createUserRoute} options={{ ignoreLastLine: true }}>
        <p>
          <code>PathPatternWithParams</code> is like <code>PathPattern</code> exept it let you define dynamic params on
          the path.
        </p>
      </Row>
    </>
  );
};
