import React, { ReactNode } from "react";
import "../theme";

const colors = [
  "base-pale",
  "base-black",
  "base-white",
  "brand-yellow",
  "brand-red",
  "brand-blue",
  "brand-blue-sky",
  "brand-green",
  "foreground",
  "background",
  "negative",
  "highlight",
  "cold",
  "lukewarm",
  "hot",
];

const spacings = ["m", "l", "xl", "gap"];

const fontSizes = [
  "3xl",
  "2xl",
  "xl",
  "l",
  "m",
  "s",
  "heading",
  "input",
  "body",
  "display",
];

export const CssVariable = ({
  id,
  property,
}: {
  id: string;
  property: string;
}): JSX.Element => (
  <React.Fragment>
    <h3 style={{ textAlign: "center" }}>{id}</h3>
    <code
      style={{
        display: "block",
        textAlign: "center",
        marginTop: "0.75em",
        fontSize: "small",
      }}
    >{`var(--${property}-${id})`}</code>
  </React.Fragment>
);

export const ColorBlock = ({ id }: { id: string }): JSX.Element => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    }}
  >
    <div
      style={{
        width: "100%",
        aspectRatio: "1 / 1",
        backgroundColor: `var(--color-${id})`,
        border: "1px solid var(--color-base-black)",
        borderRadius: "var(--border-radius-m)",
      }}
    />
    <CssVariable id={id} property="color" />
  </div>
);

export const SpacingBlock = ({ id }: { id: string }): JSX.Element => (
  <div>
    <div
      style={{
        display: "flex",
        position: "relative",
        padding: `var(--spacing-${id})`,
        backgroundColor: "var(--color-brand-yellow)",
        aspectRatio: "1 / 1",
        alignItems: "stretch",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          fontSize: "0.6em",
          backgroundColor: "var(--color-base-black)",
          color: "var(--color-base-white)",
          padding: "0.16em",
        }}
      >
        spacing
      </span>
      <div
        style={{
          backgroundColor: "var(--color-brand-blue)",
          height: "100%",
          width: "100%",
        }}
      />
    </div>
    <CssVariable id={id} property="spacing" />
  </div>
);

export const TextSize = ({ id }: { id: string }) => (
  <div style={{ marginTop: "var(--spacing-l)" }}>
    <p
      style={{
        fontSize: `var(--size-${id})`,
        paddingBottom: "var(--spacing-m)",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        margin: 0,
      }}
    >
      The quick brown fox jumps over the lazy dog
    </p>
    <code>{`var(--size-${id})`}</code>
  </div>
);

export const Grid = ({ children }: { children: ReactNode }): JSX.Element => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(256px, 1fr))",
      gap: "var(--spacing-m)",
    }}
  >
    {children}
  </div>
);

const Theme = (): JSX.Element => {
  return (
    <React.Fragment>
      <h1>Theme</h1>
      <h2>Color variables</h2>
      <Grid>
        {colors.map((color) => (
          <ColorBlock id={color} />
        ))}
      </Grid>

      <h2>Spacing variables</h2>
      <Grid>
        {spacings.map((spacing) => (
          <SpacingBlock id={spacing} />
        ))}
      </Grid>

      <h2>Font size variables</h2>
      {fontSizes.map((size) => (
        <TextSize id={size} />
      ))}
    </React.Fragment>
  );
};

export default Theme;
