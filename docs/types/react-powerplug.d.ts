declare module 'react-powerplug' {
  namespace PowerPlug {
    export type ToggleProps = {
      initial?: boolean;
      children: (params: { on: boolean; toggle: () => void }) => JSX.Element;
    };

    export const Toggle: React.SFC<ToggleProps>;
  }

  export = PowerPlug;
}
